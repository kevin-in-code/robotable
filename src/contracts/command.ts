import { Simulator } from "./simulator";

interface Command {
    performOn: (simulation: Simulator) => void;
}

export {
    Command,
}
