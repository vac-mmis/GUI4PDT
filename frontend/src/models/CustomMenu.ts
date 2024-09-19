/**
 * Implementation of objects inside PDTs.
 *
 * @module PDT.CustomMenu
 */
export class CustomMenu {
    constructor(
        public title: string,
        public icon?: string,
        public route: string = "",
        public subMenus: CustomMenu[] = [],
        public callback?: (object: Object) => void
    ) {}
}
