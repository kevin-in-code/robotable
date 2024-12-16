import { PlaySurface } from "@src/contracts/play-surface";
import { Robot } from "./robot";
import { Position } from "./position";

type Script = string[];

type PathFinder = (surface: PlaySurface, robot: Robot, goal: Position) => Script | undefined;

export {
    PathFinder,
};
