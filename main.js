import questions from "./js/questions";
import controller from "./controllers/controller";
import levels from "./controllers/levels";
import subjects from "./js/subjects";

questions();

controller();
levels();

await questions();
await subjects();
