import Foundation

/// Swift port of `PartColor` (packages/nitro-renderer/src/avatar/structure/figure/PartColor.ts).
public final class PartColor {
    public let id: Int
    public let index: Int
    public let clubLevel: Int
    public let isSelectable: Bool
    public let rgb: UInt32

    public init(data: FigureDataColor) {
        id = data.id
        index = data.index ?? -1
        clubLevel = data.club ?? 0
        isSelectable = data.selectable ?? false
        rgb = data.hexCode.flatMap { UInt32($0, radix: 16) } ?? 0
    }
}

/// Swift port of `Palette` (.../structure/figure/Palette.ts).
public final class Palette {
    public let id: Int
    private var colors: [Int: PartColor] = [:]

    public init(data: FigureDataPalette) {
        id = data.id
        append(data)
    }

    public func append(_ data: FigureDataPalette) {
        for color in data.colors ?? [] { colors[color.id] = PartColor(data: color) }
    }

    public func getColor(_ id: Int) -> PartColor? { colors[id] }
}

/// Swift port of `FigurePart` (.../structure/figure/FigurePart.ts).
public final class FigurePart {
    public let id: Int
    public let type: AvatarFigurePartType
    public let index: Int
    public let colorLayerIndex: Int

    public init(data: FigureDataPart) {
        id = data.id
        type = AvatarFigurePartType(rawValue: data.type) ?? .none
        index = data.index
        colorLayerIndex = data.colorindex ?? -1
    }
}

/// Swift port of `FigurePartSet` (.../structure/figure/FigurePartSet.ts) - one selectable clothing
/// item (e.g. one specific hairstyle), composed of one or more drawable `FigurePart` layers.
public final class FigurePartSet {
    public let id: Int
    public let type: AvatarFigurePartType
    public let gender: AvatarGenderType
    public let clubLevel: Int
    public let isColorable: Bool
    public let isSelectable: Bool
    public let isPreSelectable: Bool
    public let isSellable: Bool
    public private(set) var parts: [FigurePart] = []
    public private(set) var hiddenLayers: [String] = []

    public init(type: AvatarFigurePartType, data: FigureDataSet) {
        id = data.id
        self.type = type
        gender = AvatarGenderType(rawValue: data.gender ?? "") ?? .unisex
        clubLevel = data.club ?? 0
        isColorable = data.colorable ?? false
        isSelectable = data.selectable ?? false
        isPreSelectable = data.preselectable ?? false
        isSellable = data.sellable ?? false

        for partData in data.parts ?? [] {
            let newPart = FigurePart(data: partData)
            let insertIndex = FigurePartSet.partInsertionIndex(parts, newPart)

            if let insertIndex { parts.insert(newPart, at: insertIndex) } else { parts.append(newPart) }
        }

        hiddenLayers = (data.hiddenLayers ?? []).compactMap(\.partType).filter { !$0.isEmpty }
    }

    /// Mirrors `FigurePartSet.getPartIndex`: scans for the first existing part with the same
    /// `type` and an `index` <= the new part's, inserting before it. Faithfully replicated even
    /// though it does not restrict the scan to a contiguous same-type run.
    private static func partInsertionIndex(_ parts: [FigurePart], _ newPart: FigurePart) -> Int? {
        for (i, existing) in parts.enumerated() where existing.type == newPart.type && existing.index <= newPart.index {
            return i
        }

        return nil
    }
}

/// Swift port of `SetType` (.../structure/figure/SetType.ts) - one figure-string part code
/// (e.g. "hr") and every `FigurePartSet` (selectable item) declared for it.
public final class SetType {
    public let type: AvatarFigurePartType
    public let paletteId: Int
    private var partSets: [Int: FigurePartSet] = [:]
    private var isMandatoryByGender: [AvatarGenderType: (Bool, Bool)] = [:]

    public init(data: FigureDataSetType) {
        type = AvatarFigurePartType(rawValue: data.type) ?? .none
        paletteId = data.paletteId ?? -1

        isMandatoryByGender = [
            .female: (data.mandatory_f_0 ?? false, data.mandatory_f_1 ?? false),
            .male: (data.mandatory_m_0 ?? false, data.mandatory_m_1 ?? false),
            .unisex: (false, false),
        ]

        append(data)
    }

    public func append(_ setType: FigureDataSetType) {
        for set in setType.sets ?? [] { partSets[set.id] = FigurePartSet(type: type, data: set) }
    }

    public func getDefaultPartSet(gender: AvatarGenderType) -> FigurePartSet? {
        partSets.values.first { $0.clubLevel == 0 && ($0.gender == gender || $0.gender == .unisex) }
    }

    public func getPartSet(_ id: Int) -> FigurePartSet? { partSets[id] }

    public func isMandatory(gender: AvatarGenderType, count: Int) -> Bool {
        let pair = isMandatoryByGender[gender] ?? (false, false)

        return min(count, 1) == 0 ? pair.0 : pair.1
    }
}

/// Swift port of `FigureSetData` (.../structure/FigureSetData.ts) - the whole figuredata.json catalog.
public final class FigureSetData {
    private var palettes: [Int: Palette] = [:]
    private var setTypes: [AvatarFigurePartType: SetType] = [:]

    public init() {}

    @discardableResult
    public func parse(_ data: FigureData) -> Bool {
        for palette in data.palettes ?? [] { palettes[palette.id] = Palette(data: palette) }

        for set in data.setTypes ?? [] {
            let type = AvatarFigurePartType(rawValue: set.type) ?? .none

            setTypes[type] = SetType(data: set)
        }

        return true
    }

    public func appendJSON(_ data: FigureData) {
        for palette in data.palettes ?? [] {
            if let existing = palettes[palette.id] { existing.append(palette) } else { palettes[palette.id] = Palette(data: palette) }
        }

        for set in data.setTypes ?? [] {
            let type = AvatarFigurePartType(rawValue: set.type) ?? .none

            if let existing = setTypes[type] { existing.append(set) } else { setTypes[type] = SetType(data: set) }
        }
    }

    public func getMandatorySetTypeIds(gender: AvatarGenderType, count: Int) -> [AvatarFigurePartType] {
        setTypes.values.filter { $0.isMandatory(gender: gender, count: count) }.map(\.type)
    }

    public func getDefaultPartSet(_ type: AvatarFigurePartType, gender: AvatarGenderType) -> FigurePartSet? {
        setTypes[type]?.getDefaultPartSet(gender: gender)
    }

    public func getSetType(_ type: AvatarFigurePartType) -> SetType? { setTypes[type] }

    public func getPalette(_ paletteId: Int) -> Palette? { palettes[paletteId] }
}
