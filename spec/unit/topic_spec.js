const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

      Topic.create({
        title: "Science Discussion",
        description: "Science is cool. Let's talk about it here."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "Gravity",
          body: "Let's learn how gravity works.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#create()", () => {

    it("should create a topic object with a title and description", (done) => {
      Topic.create({
        title: "Science Discussion",
        description: "Science is cool. Let's talk about it here."
      })
      .then((topic) => {
        expect(topic.title).toBe("Science Discussion");
        expect(topic.description).toBe("Science is cool. Let's talk about it here.");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a topic with a missing title or description", (done) => {
        Topic.create({
          title: "Science Discussion",
          description: "Science is cool. Let's talk about it here.",
        })
        .then((post) => {
            done();

        })
        .catch((err) => {
   
          expect(err.message).toContain("Topic.title cannot be null");
          expect(err.message).toContain("Topic.description cannot be null");
          done();
        })
      });
  });

  describe("#getPosts()", () => {

    it("should return the associated posts", (done) => {
      this.topic.getPosts()
      .then((associatedPosts) => {
        expect(associatedPosts[0].topicId).toBe(this.topic.id);
        done();
      });

    });

  });

});