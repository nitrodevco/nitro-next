// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "NitroSwift",
    platforms: [
        .iOS(.v15),
        .macOS(.v12),
        .tvOS(.v15),
    ],
    products: [
        .library(name: "NitroCore", targets: ["NitroCore"]),
        .library(name: "NitroAssets", targets: ["NitroAssets"]),
        .library(name: "NitroAvatar", targets: ["NitroAvatar"]),
        .library(name: "NitroRoom", targets: ["NitroRoom"]),
        .library(name: "NitroRendererKit", targets: ["NitroRendererKit"]),
    ],
    dependencies: [
        // Used only to read the .nitro asset bundles (which are plain zip archives).
        .package(url: "https://github.com/weichsel/ZIPFoundation.git", from: "0.9.19"),
    ],
    targets: [
        .target(
            name: "NitroCore"
        ),
        .target(
            name: "NitroAssets",
            dependencies: [
                "NitroCore",
                .product(name: "ZIPFoundation", package: "ZIPFoundation"),
            ]
        ),
        .target(
            name: "NitroAvatar",
            dependencies: ["NitroCore", "NitroAssets"],
            resources: [.copy("Resources")]
        ),
        .target(
            name: "NitroRoom",
            dependencies: ["NitroCore", "NitroAssets"]
        ),
        .target(
            name: "NitroRendererKit",
            dependencies: ["NitroCore", "NitroAssets", "NitroAvatar", "NitroRoom"]
        ),
        .executableTarget(
            name: "NitroSwiftDemo",
            dependencies: ["NitroCore", "NitroAssets", "NitroAvatar", "NitroRoom", "NitroRendererKit"]
        ),
        .testTarget(
            name: "NitroAssetsTests",
            dependencies: ["NitroAssets"]
        ),
        .testTarget(
            name: "NitroAvatarTests",
            dependencies: ["NitroAvatar"]
        ),
        .testTarget(
            name: "NitroRoomTests",
            dependencies: ["NitroCore", "NitroAssets", "NitroRoom"]
        ),
    ]
)
