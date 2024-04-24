import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { IUser } from "./models/User";

export function defineRulesFor(user: IUser) {
  const { can, cannot, rules } = new AbilityBuilder(createMongoAbility);

  cannot("read", "Dog");
  can("delete", "Dog", {
    status: "in-custody",
    ownerId: user._id,
  });

  return rules;
}
