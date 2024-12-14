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
import { setupGlobalEnvironment } from "./environment";

const theGlobalEnv = setupGlobalEnvironment();
driverLoop(theGlobalEnv);
