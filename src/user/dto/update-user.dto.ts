import { Prisma } from '@prisma/client';

export class UpdateUserDto {
  id?: Prisma.StringFieldUpdateOperationsInput | string;
  email?: Prisma.StringFieldUpdateOperationsInput | string;
  name?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
  username?: Prisma.StringFieldUpdateOperationsInput | string;
  password?: Prisma.StringFieldUpdateOperationsInput | string;
  Prime1LogIds?:
    | Prisma.NullableStringFieldUpdateOperationsInput
    | string
    | null;
  Prime2LogIds?:
    | Prisma.NullableStringFieldUpdateOperationsInput
    | string
    | null;
  Prime3LogIds?:
    | Prisma.NullableStringFieldUpdateOperationsInput
    | string
    | null;
  Prime1Log?: Prisma.Prime1LogUpdateManyWithoutUserInput;
  Prime2Log?: Prisma.Prime2LogUpdateManyWithoutUserInput;
  Prime3Log?: Prisma.Prime3LogUpdateManyWithoutUserInput;
}
