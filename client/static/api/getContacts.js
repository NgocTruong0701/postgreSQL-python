/**
 * Asynchronous function to fetch contacts from a server.
 *
 * @returns {Promise<contact[]>} A promise that resolves to an array of contacts.
 * @throws {Error} If the HTTP response is not okay or if an error occurs during the fetch operation.
 *
 * @async
 * @function
 * @name getContacts
 *
 * @example
 * try {
 *   const contacts = await getContacts();
 *   console.log(contacts);
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function getContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("/contacts", {
                method: "GET",
                headers: {},
            });
            if (response.ok) {
                const result = yield response.json();
                return result;
            }
            else {
                throw new Error("Bad response");
            }
        }
        catch (err) {
            throw new Error("Can't do the fetch");
        }
    });
}
