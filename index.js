module.exports = app => {
  const events = ['pull_request.opened', 'pull_request.closed'];
  
  app.on(events, async context => {
    const { github, payload } = context;
    
    if(payload.pull_request.milestone != null) {
      return
    }

    const milestones = context.github.issues.listMilestonesForRepo(
      context.repo({ state: "open" })
    );
    
    milestones.then(result => {
      const milestoneId = result.data.map(milestone => milestone.number)[0];
      const pr = context.issue({
        issue_number: payload.pull_request.number,
        milestone: milestoneId
      });

      context.github.issues.update(pr);
    });
  });
};
