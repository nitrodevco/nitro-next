import Foundation

// Mirrors packages/nitro-api/src/asset/avatar/figuredata/*.ts - the `figuredata.json` schema.

public struct FigureDataColor: Decodable {
    public let id: Int
    public let index: Int?
    public let club: Int?
    public let selectable: Bool?
    public let hexCode: String?
}

public struct FigureDataPalette: Decodable {
    public let id: Int
    public let colors: [FigureDataColor]?
}

public struct FigureDataHiddenLayer: Decodable {
    public let partType: String?
}

public struct FigureDataPart: Decodable {
    public let id: Int
    public let type: String
    public let colorable: Bool?
    public let index: Int
    public let colorindex: Int?
}

public struct FigureDataSet: Decodable {
    public let id: Int
    public let gender: String?
    public let club: Int?
    public let colorable: Bool?
    public let selectable: Bool?
    public let preselectable: Bool?
    public let sellable: Bool?
    public let parts: [FigureDataPart]?
    public let hiddenLayers: [FigureDataHiddenLayer]?
}

public struct FigureDataSetType: Decodable {
    public let type: String
    public let paletteId: Int?
    public let mandatory_m_0: Bool?
    public let mandatory_f_0: Bool?
    public let mandatory_m_1: Bool?
    public let mandatory_f_1: Bool?
    public let sets: [FigureDataSet]?
}

public struct FigureData: Decodable {
    public let palettes: [FigureDataPalette]?
    public let setTypes: [FigureDataSetType]?
}
