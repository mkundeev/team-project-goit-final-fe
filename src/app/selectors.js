export const getToken = state => state.currentUser.token;
export const getEmail = state => state.currentUser.email;
export const getStartedTests = state => state.currentUser.startedTests;
export const getStartedTestsIds = state =>
  state.currentUser.startedTests?.map(test => test.testId);
