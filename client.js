let ready = false;

FlowRouter.triggers.enter(function (context, redirect) {
  const route = context.route;

  if (!Meteor.userId)
    ready = true;
  if (ready)
    FlowRouter.Auth.check(route.name || route.path, route.group, redirect);
  else {
    Tracker.autorun(c => {
      if (FlowRouter.subsReady()) {
        c.stop();
        FlowRouter.Auth.check(route.name || route.path, route.group, redirect);
      }
    });
  }
});