export class UpdateUserDto {
  constructor (
    public readonly id: number,
    public readonly fn: string,
    public readonly ln: string,
    public readonly dob: Date
  ) { }
}