import { Position, Toaster, Intent } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";

export const AppToaster = Toaster.create({
  className: "recipe-toaster",
  position: Position.TOP
});

export const showToast = ({ message }: any) => {
  // create toasts in response to interactions.
  // in most cases, it's enough to simply create and forget (thanks to timeout).
  AppToaster.show({ intent: Intent.PRIMARY, message: message });
};
