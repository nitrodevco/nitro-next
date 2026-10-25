# The imager's deploy script for Ploi. The site's Deploy script runs it after pulling:
#
#     cd {SITE_DIRECTORY}
#     git pull origin {BRANCH}
#     bash packages/nitro-imager/deploy/ploi-deploy.sh
#
# It installs the imager and what it runs on, builds it into packages/nitro-imager/dist and has the
# daemon (`node .../dist/main.js`, see docs/imager-ploi.md) start again on the new build.
#
# It runs as the site's user, which may have no sudo: so it does not restart the daemon through
# supervisorctl. It stops the running imager (SIGTERM), Supervisor starts it again with the new build
# (the daemon restarts on exit), and the script waits until it answers.
set -e

SITE="$(cd "$(dirname "$0")/../../.." && pwd)"
IMAGER="$SITE/packages/nitro-imager"

# Where the imager listens: the site's .env (its Environment tab), as the daemon loads it.
setting() {
    grep -E "^$1=" "$SITE/.env" 2>/dev/null | tail -n 1 | cut -d= -f2- | tr -d "\"'\r"
}

HOST="$(setting IMAGER_HOST)"
PORT="$(setting IMAGER_PORT)"
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-3030}"

if [ "$HOST" = "0.0.0.0" ]; then HOST=127.0.0.1; fi

# Yarn 4, the version package.json names, through Node's corepack: nothing to install globally.
export COREPACK_ENABLE_DOWNLOAD_PROMPT=0

cd "$SITE"

# Only the imager and what it runs on, with its own build tooling (esbuild), not the client's.
corepack yarn workspaces focus @nitrodevco/nitro-imager

# Built beside the running one and swapped in whole: a failed build stops here and leaves the last.
corepack yarn workspace @nitrodevco/nitro-imager build

# The imager again, on the new build. Its modules are all loaded as it starts, so the swap has not
# touched the one running.
if pkill -TERM -u "$(id -u)" -f "$IMAGER/dist/main\.js"; then
    echo "Restarting the imager..."
    sleep 2
else
    # The first deploy, or a daemon Supervisor gave up on while there was nothing built to run.
    echo "Built. The imager is not running: start (or restart) its daemon in Ploi."
    exit 0
fi

# It loads the avatar data and badge parts before it listens. Up to 2 minutes; the deploy fails if
# it never answers.
for attempt in $(seq 1 60); do
    if curl -fsS "http://${HOST}:${PORT}/health" >/dev/null 2>&1; then
        echo "Imager deployed"
        exit 0
    fi

    sleep 2
done

echo "The imager did not come back: see the daemon's log in Ploi." >&2
exit 1
