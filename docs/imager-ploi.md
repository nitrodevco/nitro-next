# Running the imager on Ploi

This sets up [the imager](imager.md) on a server managed by [Ploi](https://ploi.io): a site for its
domain and certificate, Ploi's NGINX in front of it, and a Ploi daemon (Supervisor) keeping it
running. The examples use `habbo-imaging.example.com` and Ploi's default `ploi` user; put your
own domain in their place everywhere, paths included.

**If the site runs as another system user** - Ploi lets a site have its own, and its files are
then under that user's home - every `/home/ploi/` below is `/home/<that user>/`, and the daemon in
step 4 runs as that user. `ls -ld` on the site directory shows who owns it. A daemon with the
wrong user or paths never starts, and every request is then a 502. The images are at the subdomain's root:

- `https://habbo-imaging.example.com/avatar?figure=...`
- `https://habbo-imaging.example.com/badge/<code>.gif`

```
browser / client ──https──▶ NGINX (Ploi site, SSL) ──▶ 127.0.0.1:3030 imager (Ploi daemon)
                                                          │
                              bundles + gamedata ◀────────┘  (urls, or folders on this server)
```

## What the server needs

- **Ubuntu, managed by Ploi.** Nothing native has to be compiled: the canvas library and esbuild
  ship prebuilt for Linux x64 and arm64, glibc and musl alike.
- **Node.js 24 (LTS).** Over SSH, `node -v` should print `v24.x`, and `which node`
  tells you its path for the daemon below. Node 25 and later no longer ship `corepack`, which the
  install step uses; on those, `npm install -g corepack` first.
- **Memory: about 1 GB for the imager** at the default settings. It levels off around 800 MB
  resident with 300 libraries loaded (`IMAGER_MAX_LIBRARIES`); lower that on a smaller server.
- **Disk: about 200 MB** for the imager's dependencies and build tooling, on top of the repository.

## 1. Give the imager its subdomain

The imager gets a subdomain of its own, here `habbo-imaging.example.com`, served by its own Ploi
site.

### DNS

At whoever hosts `example.com`'s DNS, add a record for the subdomain pointing at the Ploi server:

| Type | Name | Value |
|---|---|---|
| `A` | `habbo-imaging` | the server's IPv4 address (on the server's page in Ploi) |
| `AAAA` | `habbo-imaging` | its IPv6 address, if it has one |

A `CNAME` from `habbo-imaging` to a hostname that already resolves to the server works as well. Give it a
few minutes, then check from your own machine that it answers with the server's address:

```sh
dig +short habbo-imaging.example.com
```

Wait for this before requesting the certificate in step 6: Let's Encrypt checks the subdomain
reaches this server.

**Behind Cloudflare**, the record can be proxied (orange cloud) or DNS only. Proxied, set the
zone's SSL/TLS mode to **Full (strict)**: anything less either fails against the site's https
redirect or sends traffic to the server unencrypted. Cloudflare then also caches the images by
the imager's own `Cache-Control` headers (see [Running it behind a CDN](#running-it-behind-a-cdn)).

### The Ploi site

1. In Ploi, open the server and add a site whose domain is the **subdomain itself**,
   `habbo-imaging.example.com` - not `example.com` with an alias. It needs no PHP or database;
   the web directory does not matter, nothing is served from disk.
2. On the site, **install the repository** `nitrodevco/nitro-next` on the branch you deploy.
   Untick any option to install Composer or npm dependencies: the deploy script below installs
   what the imager needs, and only that.

The site directory is now `/home/ploi/habbo-imaging.example.com`. Every path in this guide
follows the subdomain: with a different one, say `imaging.myhotel.com`, the site is
`/home/ploi/imaging.myhotel.com`, and so is everything below.

To also serve the imager on a second subdomain, add it to the same site as an alias, and the
certificate in step 6 for both names. The imager answers on any name NGINX passes to it.

## 2. Environment

On the site's General page, **Edit environment** opens the site's `.env`
(`/home/ploi/habbo-imaging.example.com/.env`). The daemon reads it from there. Start from
[`packages/nitro-imager/.env.example`](../packages/nitro-imager/.env.example):

```ini
IMAGER_HOST=127.0.0.1
IMAGER_PORT=3030
IMAGER_CACHE_MB=64
IMAGER_MAX_LIBRARIES=300

IMAGER_TEMPLATES_URL=https://cdn.example.com/bundled/templates/%libname%.nitro
IMAGER_FIGURE_BUNDLE_URL=https://cdn.example.com/bundled/figures/%libname%.nitro
IMAGER_EFFECT_BUNDLE_URL=https://cdn.example.com/bundled/effects/%libname%.nitro
IMAGER_FIGUREMAP_URL=https://cdn.example.com/gamedata/FigureMap.json
IMAGER_FIGUREDATA_URL=https://hotel.example.com/gamedata/figuredata_json/0
IMAGER_EFFECTMAP_URL=https://cdn.example.com/gamedata/EffectMap.json

IMAGER_PET_BUNDLE_URL=https://cdn.example.com/bundled/pet/%libname%.nitro
IMAGER_FURNITURE_BUNDLE_URL=https://cdn.example.com/bundled/furniture/%libname%.nitro
IMAGER_FURNIDATA_URL=https://hotel.example.com/gamedata/furnidata_json/0
IMAGER_FURNIDATA_REFRESH_SECONDS=600

IMAGER_BADGE_PART_URL=https://images.habbo.com/c_images/Badgeparts/
IMAGER_BADGE_PARTS=https://hotel.example.com/gamedata/badgeparts_json/0
IMAGER_BADGE_PARTS_REFRESH_SECONDS=300
```

- Keep `IMAGER_HOST=127.0.0.1`: NGINX is the only thing that should reach the imager, and no
  firewall rule is needed for its port. If 3030 is taken on the server, pick another port and use
  the same one in the NGINX block in step 5.
- The avatar addresses are the ones the client is configured with (`asset.bundles.templates`,
  `asset.bundles.avatar`, `asset.bundles.effects`, `figuremap.url`, `figuredata.url`,
  `effectmap.url`).
- `IMAGER_BADGE_PARTS` is Turbo's `badgeparts_json` gamedata file, so a colour staff retune
  reaches the badges. Leave it out to draw with the table the package ships.
- Pets and furniture are optional: leave their lines out and `/pet` and `/furni` answer that they
  are not set up. Their addresses are the client's `asset.bundles.pets`, `asset.bundles.furni` and
  `furnituredata.url`. A hotel whose `renderer.petTypes` differs from the client's default list sets
  it as `IMAGER_PET_TYPES`, comma separated, in the same order.

### Bundles already on this server

If the hotel's bundles are on this same server, for example under another Ploi site, give the
imager their folders instead of urls. It reads them from disk, and urls and folders mix freely:

```ini
IMAGER_TEMPLATES_URL=/home/ploi/cdn.example.com/public/bundled/templates
IMAGER_FIGURE_BUNDLE_URL=/home/ploi/cdn.example.com/public/bundled/figures
IMAGER_EFFECT_BUNDLE_URL=/home/ploi/cdn.example.com/public/bundled/effects
IMAGER_FIGUREMAP_URL=/home/ploi/cdn.example.com/public/gamedata/FigureMap.json
```

A bundle folder holds `<library>.nitro` files. The site's user must be able to read them, and a
path that is not there stops the imager at start-up, naming it.

## 3. Deploy script

Replace the site's deploy script with the following. Keep the `cd` and `git pull` lines Ploi
generated for the site if they differ: they carry its directory and branch.

```sh
cd {SITE_DIRECTORY}
git pull origin {BRANCH}
bash packages/nitro-imager/deploy/ploi-deploy.sh
```

[`ploi-deploy.sh`](../packages/nitro-imager/deploy/ploi-deploy.sh) installs only the imager and
what it runs on (`yarn workspaces focus`, without the client's build tooling), builds it into
`packages/nitro-imager/dist`, then stops the running imager so Supervisor starts it on the new
build, and waits for `/health` to answer on the `IMAGER_HOST` and `IMAGER_PORT` in the site's
`.env`. A failed install or build stops the deploy and leaves the running imager and its last
build alone; an imager that does not answer within 2 minutes fails it.

Deploy once now, so the imager is built before the daemon starts. This first deploy ends with
"The imager is not running", which is expected.

## 4. Daemon

On the **server** (not the site), open **Daemons** and add one:

| Field | Value |
|---|---|
| Command | `/usr/bin/node --enable-source-maps --env-file=/home/ploi/habbo-imaging.example.com/.env /home/ploi/habbo-imaging.example.com/packages/nitro-imager/dist/main.js` |
| Directory | `/home/ploi/habbo-imaging.example.com/packages/nitro-imager` |
| User | the site's system user: `ploi`, or the one the site was created with |
| Processes | `1` |

- Use the path `which node` gave you if it is not `/usr/bin/node`. Supervisor does not load
  your shell's `PATH`, so a Node installed through nvm needs its full path here.
- **One process only.** Each would try to listen on the same port, and every process holds its
  own libraries and cache.
- Keep the command's `.../packages/nitro-imager/dist/main.js` path as it is: the deploy script
  restarts the imager by finding the process running it.
- The daemon's output is in a `worker-<id>.log` under the `.ploi` folder of a user's home
  (`sudo sh -c 'ls -t /home/*/.ploi/worker-*.log | head'` finds the newest). A healthy start ends
  with `Imager listening on http://127.0.0.1:3030`; a missing or wrong setting is named there
  instead.
- To see a start-up error directly, run the command by hand as the site's user, from the
  daemon's directory: `sudo -u <user> <the command above>`. Ctrl+C stops it.

## 5. NGINX

On the site, open the NGINX configuration and replace its `location / { ... }` block with a
proxy to the imager. Leave the `server_name`, `listen` and certificate lines that Ploi manages.

```nginx
location / {
    proxy_pass http://127.0.0.1:3030;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 60s;
}
```

Save; Ploi tests the configuration and reloads NGINX.

## 6. SSL

On the site's **SSL** tab, request a Let's Encrypt certificate for `habbo-imaging.example.com`.
The client loads the images from an https page, so they must be https too.

## 7. Check it

On the server, the imager itself:

```sh
curl http://127.0.0.1:3030/health
```

Then from anywhere, through NGINX:

```sh
curl https://habbo-imaging.example.com/health
```

With Ploi's **Cloudflare-only** setting on for the site, NGINX closes any connection that does not
come from Cloudflare without answering. A request to the server's own address - `curl` on the
server against `127.0.0.1:443`, or `--resolve` to its IP - then fails with an empty reply or an
HTTP/2 `PROTOCOL_ERROR`, whatever the imager is doing. Test the imager on `127.0.0.1:3030`, and the
site through its Cloudflare address.

This returns `ok: true`, with how many images are cached, the loaded libraries, the badge table's
version and the process's memory. Then open an avatar and a badge in a browser:

- `https://habbo-imaging.example.com/avatar?figure=hd-180-1.ch-210-66.lg-270-82.sh-290-80&action=wav`
- `https://habbo-imaging.example.com/badge/b05114s06114.gif`

## 8. Point the client at it

In the hotel's client configuration (Turbo's external variables, or `nitro-config.json`):

```json
"badge.asset.group.url": "https://habbo-imaging.example.com/badge/%badgedata%.gif",
"group.badge.url": "https://habbo-imaging.example.com/badge/%imagerdata%.gif"
```

A site or page that builds avatar urls uses `https://habbo-imaging.example.com/avatar?figure=...`
with the parameters in [the imager's docs](imager.md).

The imager also answers Habbo's own paths - `/avatarimage`, and both images under
`/habbo-imaging/` - so a url written for Habbo's imager only needs its host changed. That also
lets an existing domain keep a `/habbo-imaging/` address instead of a subdomain: give that site's
NGINX a `location /habbo-imaging/ { ... }` with the same `proxy_pass`.

## Running it behind a CDN

The imager sets the cache headers a CDN or browser needs:

- a complete avatar: `public, max-age=604800`;
- a badge: `public, max-age=3600`, as its colours can be retuned;
- an image missing a part (a library that failed to load, a set or effect that does not exist):
  `no-store`, so it is drawn again on the next request rather than kept wrong.

With Cloudflare or similar in front, cache by the full url, query string included.

## Updating

Deploy the site. The script installs any new dependencies, rebuilds and restarts the imager. In-memory
caches start empty, so the first requests for each figure fetch their libraries again.

## When something is wrong

| Symptom | Look at |
|---|---|
| The certificate request fails, or the subdomain shows another site | `dig +short habbo-imaging.example.com` must give this server's address. Behind Cloudflare, the SSL mode must be Full (strict). Another site on the server must not already list the subdomain as an alias. |
| `502 Bad Gateway`; the site's NGINX error log says `connect() failed (111: Connection refused)` to `127.0.0.1:3030` | The imager is not running. `sudo supervisorctl status`, then the daemon's log. A site under another system user needs that user and its `/home/<user>/` paths in the daemon. Or `IMAGER_PORT` and the `proxy_pass` port differ. |
| A request straight to the server's address gets no reply at all | The site's Cloudflare-only setting, working as meant: see step 7. |
| A deploy fails with "The imager did not come back" | The daemon's log: the new build did not start, or took over 2 minutes to load its data. |
| The daemon keeps restarting | `Cannot find module .../dist/main.js`: nothing is built yet, so deploy the site. Otherwise its log: a missing setting or path is named at start-up. `node: not found` means the command needs Node's full path. |
| Every avatar is `no-store` | The bundle addresses: the libraries are not being found. A folder must hold `<library>.nitro`; a url must contain `%libname%`. |
| Badges draw in the wrong colours | `IMAGER_BADGE_PARTS` is not Turbo's table, or Turbo predates `badgeparts_json`; `/health` shows the table version in use. |
| Memory keeps climbing past ~1 GB | Lower `IMAGER_MAX_LIBRARIES` (and `IMAGER_CACHE_MB`). `/health` shows the library count and memory. |
