import { Languages } from "../../enums/languages/languages";

export default interface TranslationItem {
    label: string;
    description: Description;
}
interface Description {
    LTU: Languages.LITHUANIA;
}

