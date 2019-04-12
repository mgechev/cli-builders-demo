import { JsonObject } from '@angular-devkit/core';
interface Options extends JsonObject {
    command: string;
    args: string[];
}
declare const _default: import("@angular-devkit/architect/src/internal").Builder<Options>;
export default _default;
