export enum ChangeUserNameResultMessageCode {
    NameOk = 0,
    ErrorNameRequired = 1,
    ErrorNameTooShort = 2,
    ErrorNameTooLong = 3,
    ErrorNameNotValid = 4,
    ErrorNameInUse = 5,
    ErrorNameChangeNotAllowed = 6,
    ErrorMergeHotelName = 7,
}