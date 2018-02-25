export class CreateUserDto {
  constructor(
    public readonly fn: string,
    public readonly ln: string,
    public readonly dob: Date
  ) { }
}