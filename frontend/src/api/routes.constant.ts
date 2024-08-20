const API_ROUTES = {
  account: {
    profileMe: "/account/profile/me",
    isAuthenticated: "account-check-is-authenticated",
  },
  auth: {
    signIn: "/auth/sign-in",
    signUp: "/auth/sign-up",
  },
  users: {
    usersList: "/users/list",
  },
  conversion: {
    room: "/conversion/room",
    rooms: "/conversion/rooms",
    roomMessages: "/conversion/room/:id/messages",
    roomSingle: "/conversion/room/:id",
  }
}

export default API_ROUTES;
