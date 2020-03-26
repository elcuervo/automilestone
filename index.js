module.exports = app => {
  app.on('pull_request.opened', async context => {
    const { github, payload } = context;

    const milestones = context.github.issues.listMilestonesForRepo(
      context.repo({ state: "open" })
    ); 
    
    milestones.then(result => {
      const milestoneId = result.data.map(milestone => milestone.number)[0];
      const pr = context.issue({
        pr_number: payload.pull_request.number,
        milestone: milestoneId
      });

      context.github.issues.update(pr).then(result => console.log(result));
    });
  });
};
