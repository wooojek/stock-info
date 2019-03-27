import authReducer from '../../reducers/auth';

test('should set uid for login', () => {
  const uid = 'test_uid';
  const action = { type: 'LOGIN', uid };
  const state = authReducer(undefined, action);

  expect(state).toEqual({ uid });
});

test('should clear uid for logout', () => {
  const action = { type: 'LOGOUT' };
  const state = authReducer({ uid: 'test' }, action);

  expect(state).toEqual({});
});