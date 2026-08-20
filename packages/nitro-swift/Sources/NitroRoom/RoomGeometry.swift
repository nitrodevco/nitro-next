import CoreGraphics
import Foundation

import NitroCore

/// Swift port of `RoomGeometry` (packages/nitro-renderer/src/room/utils/RoomGeometry.ts).
///
/// This is a genuine 3D camera projection (not simplified 2D tile math): the room camera has an
/// orthonormal basis (`_x`, `_y`, `_z`) derived from an Euler `direction` rotation, and world-space
/// tile/item positions are projected onto the screen plane via dot products against that basis,
/// exactly mirroring the original isometric-camera implementation so avatar/furniture placement
/// lines up pixel-for-pixel with the TS renderer.
public final class RoomGeometry {
    private var _updateId: Int = 0

    private let _x = Vector3d()
    private let _y = Vector3d()
    private let _z = Vector3d()
    private let _directionAxis = Vector3d()
    private let _location = Vector3d()
    private let _direction = Vector3d()
    private let _depth = Vector3d()

    private var _scale: Double = 1
    private var _xScale: Double = 1
    private var _yScale: Double = 1
    private var _zScale: Double = 1
    private let _xScaleInternal: Double = 1
    private let _yScaleInternal: Double = 1
    private let _zScaleInternal: Double = (1.0 / 2).squareRoot() / (3.0 / 4).squareRoot()

    private var _loc: Vector3d
    private var _dir: Vector3d?

    private var _clipNear: Double = -500
    private var _clipFar: Double = 500

    private var _displacements: [String: Vector3d] = [:]

    public init(scale: RoomGeometryScaleType, direction: Vector3d, location: Vector3d, depth: Vector3d? = nil) {
        _loc = Vector3d()

        self.scale = Double(scale.rawValue)

        self.location.assign(location)

        setLocation(Vector3d(location.x, location.y, location.z))
        self.direction = Vector3d(direction.x, direction.y, direction.z)

        setDepthVector(depth ?? direction)
    }

    public static func getIntersectionVector(rayOrigin: Vector3d, rayDirection: Vector3d, planePoint: Vector3d, planeNormal: Vector3d) -> Vector3d {
        Vector3d.sum(
            rayOrigin,
            Vector3d.product(
                rayDirection,
                -Vector3d.dotProduct(planeNormal, Vector3d.dif(rayOrigin, planePoint)) / Vector3d.dotProduct(rayDirection, planeNormal)
            )
        )
    }

    public func dispose() {}

    public func setDisplacement(location: Vector3d, displacement: Vector3d) {
        let key = RoomGeometry.displacementKey(location)

        _displacements.removeValue(forKey: key)
        _displacements[key] = Vector3d.from(displacement)
        _updateId += 1
    }

    public func setDepthVector(_ rotation: Vector3d) {
        let upAxis = Vector3d(0, 1, 0)
        let zAxis = Vector3d(0, 0, 1)
        let xAxis = Vector3d(1, 0, 0)

        let rotXRad = (rotation.x / 180) * .pi
        let rotYRad = (rotation.y / 180) * .pi
        let rotZRad = (rotation.z / 180) * .pi

        let cosX = cos(rotXRad)
        let sinX = sin(rotXRad)

        let rotatedYAfterX = Vector3d.sum(Vector3d.product(upAxis, cosX), Vector3d.product(xAxis, -sinX))
        let rotatedZAfterX = Vector3d(zAxis.x, zAxis.y, zAxis.z)
        let rotatedXAfterX = Vector3d.sum(Vector3d.product(upAxis, sinX), Vector3d.product(xAxis, cosX))

        let cosY = cos(rotYRad)
        let sinY = sin(rotYRad)

        let rotatedXAfterY = Vector3d(rotatedYAfterX.x, rotatedYAfterX.y, rotatedYAfterX.z)
        let rotatedYAfterY = Vector3d.sum(Vector3d.product(rotatedZAfterX, cosY), Vector3d.product(rotatedXAfterX, sinY))
        let rotatedZAfterY = Vector3d.sum(Vector3d.product(rotatedZAfterX, -sinY), Vector3d.product(rotatedXAfterX, cosY))

        if rotZRad != 0 {
            let cosZ = cos(rotZRad)
            let sinZ = sin(rotZRad)

            let finalZ = Vector3d(rotatedZAfterY.x, rotatedZAfterY.y, rotatedZAfterY.z)

            _ = Vector3d.sum(Vector3d.product(rotatedXAfterY, cosZ), Vector3d.product(rotatedYAfterY, sinZ))
            _ = Vector3d.sum(Vector3d.product(rotatedXAfterY, -sinZ), Vector3d.product(rotatedYAfterY, cosZ))

            _depth.assign(finalZ)
        } else {
            _depth.assign(rotatedZAfterY)
        }

        _updateId += 1
    }

    public func adjustLocation(_ location: Vector3d, distance: Double) {
        let zOffset = Vector3d.product(_z, -distance)
        let adjustedLocation = Vector3d(location.x + zOffset.x, location.y + zOffset.y, location.z + zOffset.z)

        setLocation(adjustedLocation)
    }

    public func getCoordinatePosition(_ worldPos: Vector3d?) -> Vector3d {
        guard let worldPos else { return Vector3d(-1, -1, -1) }

        return Vector3d(
            Vector3d.scalarProjection(worldPos, _x),
            Vector3d.scalarProjection(worldPos, _y),
            Vector3d.scalarProjection(worldPos, _z)
        )
    }

    public func getScreenPosition(_ worldPos: Vector3d?) -> Vector3d {
        let worldPos = worldPos ?? Vector3d()

        var relativePos = Vector3d.dif(worldPos, _loc)

        relativePos.x *= _xScale
        relativePos.y *= _yScale
        relativePos.z *= _zScale

        var depthDist = Vector3d.scalarProjection(relativePos, _depth)

        if depthDist < _clipNear || depthDist > _clipFar { return Vector3d() }

        var screenX = Vector3d.scalarProjection(relativePos, _x)
        var screenY = -Vector3d.scalarProjection(relativePos, _y)

        screenX *= _scale
        screenY *= _scale

        if let displacement = getDisplacement(worldPos) {
            relativePos = Vector3d.dif(worldPos, _loc)
            relativePos.add(displacement)
            relativePos.x *= _xScale
            relativePos.y *= _yScale
            relativePos.z *= _zScale
            depthDist = Vector3d.scalarProjection(relativePos, _depth)
        }

        relativePos.x = screenX
        relativePos.y = screenY
        relativePos.z = depthDist

        return relativePos
    }

    public func getScreenPoint(_ location: Vector3d?) -> CGPoint {
        let pos = getScreenPosition(location)

        return CGPoint(x: CGFloat(pos.x), y: CGFloat(pos.y))
    }

    public func getPlanePosition(screenPoint: CGPoint, planeOrigin: Vector3d, planeAxis1: Vector3d, planeAxis2: Vector3d) -> CGPoint {
        let screenX = Double(screenPoint.x) / _scale
        let screenY = -Double(screenPoint.y) / _scale

        let xComponent = Vector3d.product(_x, screenX)

        xComponent.add(Vector3d.product(_y, screenY))

        let cameraPos = Vector3d(_loc.x * _xScale, _loc.y * _yScale, _loc.z * _zScale)

        cameraPos.add(xComponent)

        let rayDirection = _z

        let planeOriginScaled = Vector3d(planeOrigin.x * _xScale, planeOrigin.y * _yScale, planeOrigin.z * _zScale)
        let planeAxis1Scaled = Vector3d(planeAxis1.x * _xScale, planeAxis1.y * _yScale, planeAxis1.z * _zScale)
        let planeAxis2Scaled = Vector3d(planeAxis2.x * _xScale, planeAxis2.y * _yScale, planeAxis2.z * _zScale)

        let planeNormal = Vector3d.crossProduct(planeAxis1Scaled, planeAxis2Scaled)
        let intersectionPoint = Vector3d.from(RoomGeometry.getIntersectionVector(rayOrigin: cameraPos, rayDirection: rayDirection, planePoint: planeOriginScaled, planeNormal: planeNormal))

        intersectionPoint.subtract(planeOriginScaled)

        let axis1Distance = (Vector3d.scalarProjection(intersectionPoint, planeAxis1) / planeAxis1Scaled.length) * planeAxis1.length
        let axis2Distance = (Vector3d.scalarProjection(intersectionPoint, planeAxis2) / planeAxis2Scaled.length) * planeAxis2.length

        return CGPoint(x: CGFloat(axis1Distance), y: CGFloat(axis2Distance))
    }

    public func setLocation(_ location: Vector3d) {
        let prevX = _loc.x, prevY = _loc.y, prevZ = _loc.z

        _loc.assign(location)
        _loc.x /= _xScale
        _loc.y /= _yScale
        _loc.z /= _zScale

        if _loc.x != prevX || _loc.y != prevY || _loc.z != prevZ { _updateId += 1 }
    }

    public func performZoom() {
        scale = isZoomedIn() ? Double(RoomGeometryScaleType.zoomedOut.rawValue) : Double(RoomGeometryScaleType.zoomedIn.rawValue)
    }

    public func performZoomOut() { scale = Double(RoomGeometryScaleType.zoomedOut.rawValue) }
    public func performZoomIn() { scale = Double(RoomGeometryScaleType.zoomedIn.rawValue) }

    public func isZoomedIn() -> Bool { scale == Double(RoomGeometryScaleType.zoomedIn.rawValue) }

    public func increaseUpdateId() { _updateId += 1 }

    public var updateId: Int { _updateId }

    /// The logical zoom level (64 = zoomed in, 32 = zoomed out, ... - see `RoomGeometryScaleType`).
    /// Internally stored pre-multiplied by `sqrt(0.5)` for the projection math; this property
    /// transparently un-does that so callers always see/set the plain `RoomGeometryScaleType` value.
    public var scale: Double {
        get { _scale / (0.5).squareRoot() }
        set {
            var value = newValue

            if value <= Double(RoomGeometryScaleType.icon.rawValue) { value = Double(RoomGeometryScaleType.icon.rawValue) }

            value *= (0.5).squareRoot()

            if value != _scale {
                _scale = value
                _updateId += 1
            }
        }
    }

    public var location: Vector3d {
        get {
            _location.assign(_loc)
            _location.x *= _xScale
            _location.y *= _yScale
            _location.z *= _zScale

            return _location
        }
        set { setLocation(newValue) }
    }

    public var direction: Vector3d {
        get { _direction }
        set {
            if _dir == nil { _dir = Vector3d() }

            let prevX = _dir!.x, prevY = _dir!.y, prevZ = _dir!.z

            _dir!.assign(newValue)
            _direction.assign(newValue)

            if _dir!.x != prevX || _dir!.y != prevY || _dir!.z != prevZ { _updateId += 1 }

            let upAxis = Vector3d(0, 1, 0)
            let zAxis = Vector3d(0, 0, 1)
            let xAxis = Vector3d(1, 0, 0)

            let rotXRad = (newValue.x / 180) * .pi
            let rotYRad = (newValue.y / 180) * .pi
            let rotZRad = (newValue.z / 180) * .pi

            let cosX = cos(rotXRad)
            let sinX = sin(rotXRad)

            let rotatedYAfterX = Vector3d.sum(Vector3d.product(upAxis, cosX), Vector3d.product(xAxis, -sinX))
            let rotatedZAfterX = Vector3d(zAxis.x, zAxis.y, zAxis.z)
            let rotatedXAfterX = Vector3d.sum(Vector3d.product(upAxis, sinX), Vector3d.product(xAxis, cosX))

            let cosY = cos(rotYRad)
            let sinY = sin(rotYRad)

            let rotatedXAfterY = Vector3d(rotatedYAfterX.x, rotatedYAfterX.y, rotatedYAfterX.z)
            let rotatedYAfterY = Vector3d.sum(Vector3d.product(rotatedZAfterX, cosY), Vector3d.product(rotatedXAfterX, sinY))
            let rotatedZAfterY = Vector3d.sum(Vector3d.product(rotatedZAfterX, -sinY), Vector3d.product(rotatedXAfterX, cosY))

            if rotZRad != 0 {
                let cosZ = cos(rotZRad)
                let sinZ = sin(rotZRad)

                let finalX = Vector3d.sum(Vector3d.product(rotatedXAfterY, cosZ), Vector3d.product(rotatedYAfterY, sinZ))
                let finalY = Vector3d.sum(Vector3d.product(rotatedXAfterY, -sinZ), Vector3d.product(rotatedYAfterY, cosZ))
                let finalZ = Vector3d(rotatedZAfterY.x, rotatedZAfterY.y, rotatedZAfterY.z)

                _x.assign(finalX)
                _y.assign(finalY)
                _z.assign(finalZ)
                _directionAxis.assign(_z)
            } else {
                _x.assign(rotatedXAfterY)
                _y.assign(rotatedYAfterY)
                _z.assign(rotatedZAfterY)
                _directionAxis.assign(_z)
            }
        }
    }

    public var directionAxis: Vector3d { _directionAxis }

    public var xScale: Double {
        get { _xScale }
        set {
            let updated = newValue * _xScaleInternal

            if _xScale != updated {
                _xScale = updated
                _updateId += 1
            }
        }
    }

    public var yScale: Double {
        get { _yScale }
        set {
            let updated = newValue * _yScaleInternal

            if _yScale != updated {
                _yScale = updated
                _updateId += 1
            }
        }
    }

    public var zScale: Double {
        get { _zScale }
        set {
            let updated = newValue * _zScaleInternal

            if _zScale != updated {
                _zScale = updated
                _updateId += 1
            }
        }
    }

    private func getDisplacement(_ vector: Vector3d) -> Vector3d? {
        _displacements[RoomGeometry.displacementKey(vector)]
    }

    private static func displacementKey(_ vector: Vector3d) -> String {
        "\(Int(vector.x.rounded()))_\(Int(vector.y.rounded()))_\(Int(vector.z.rounded()))"
    }
}
