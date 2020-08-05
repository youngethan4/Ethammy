class userTemplate {
  constructor(id, username, discriminator) {
    (this.id = id),
      (this.username = username),
      (this.discriminator = discriminator);
  }
}
class errorTemplate {
  constructor(message, description) {
    (this.message = message), (this.description = description);
  }
}
export default {
  user: userTemplate,
  error: errorTemplate,
};
