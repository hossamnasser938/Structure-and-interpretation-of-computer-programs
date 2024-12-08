/*
Evaluator(eval, apply)
_____
Data representation layer(predicates, selectoprs, constructors)
_____
JavaScript parser
_____
JavaScript program as Text
*/

import { driverLoop } from "./driver-loop";
import { setupEnvironment } from "./environment";

const theGlobalEnv = setupEnvironment();
driverLoop(theGlobalEnv);
