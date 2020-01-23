import { Component, Binding } from "@loopback/core";
import { createEnforcer } from "./services/enforcer";
import { CmsPolicyProvider } from "./services/cms-policy.service";
import { AuthorizationTags } from "@loopback/authorization";

export class BackAutorisation implements Component {
  bindings = [
    new Binding('casbin.enforcer').toDynamicValue(createEnforcer),
    new Binding('authorizationProviders.casbin-provider').toProvider(CmsPolicyProvider).tag(AuthorizationTags.AUTHORIZER)
  ];
}
