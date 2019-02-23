const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
//const base = "http://localhost:3000/topics";
//const request = require("request");

describe("Post", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
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

    it("should create a post object with a title, body, and assigned topic", (done) => {
      Post.create({
        title: "Pros of Cryosleep during the long journey",
        body: "1. Not having to answer the 'are we there yet?' question.",
        topicId: this.topic.id
      })
      .then((post) => {
        expect(post.title).toBe("Pros of Cryosleep during the long journey");
        expect(post.body).toBe("1. Not having to answer the 'are we there yet?' question.");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a post with missing title, body, or assigned topic", (done) => {
        Post.create({
          title: "Pros of Cryosleep during the long journey"
        })
        .then((post) => {
            done();

        })
        .catch((err) => {
   
          expect(err.message).toContain("Post.body cannot be null");
          expect(err.message).toContain("Post.topicId cannot be null");
          done();
   
        })
      });
  });

  describe("#setTopic()", () => {

    it("should associate a topic and a post together", (done) => {
      Topic.create({
        title: "Challenges of interstellar travel",
        description: "1. The Wi-Fi is terrible"
      })
      .then((newTopic) => {
        expect(this.post.topicId).toBe(this.topic.id);
        this.post.setTopic(newTopic)
        .then((post) => {
          expect(post.topicId).toBe(newTopic.id);
          done();

        });
      })
    });

  });

  describe("#getTopic()", () => {

    it("should return the associated topic", (done) => {

      this.post.getTopic()
      .then((associatedTopic) => {
        expect(associatedTopic.title).toBe("Expeditions to Alpha Centauri");
        done();
      });

    });

  });

/*   describe("POST /topics/:topicId/posts/create", () => {

    it("should create a new post and redirect", (done) => {
       const options = {
         url: `${base}/${this.topic.id}/posts/create`,
         form: {
           title: "Watching snow melt",
           body: "Without a doubt my favoriting things to do besides watching paint dry!"
         }
       };
       request.post(options,
         (err, res, body) => {
 
           Post.findOne({where: {title: "Watching snow melt"}})
           .then((post) => {
             expect(post).not.toBeNull();
             expect(post.title).toBe("Watching snow melt");
             expect(post.body).toBe("Without a doubt my favoriting things to do besides watching paint dry!");
             expect(post.topicId).not.toBeNull();
             done();
           })
           .catch((err) => {
             console.log(err);
             done();
           });
         }
       );
     });
 
  });

  describe("POST /topics/:topicId/posts/:id/destroy", () => {

    it("should delete the post with the associated ID", (done) => {

//#1
      expect(post.id).toBe(1);

      request.post(`${base}/${this.topic.id}/posts/${this.post.id}/destroy`, (err, res, body) => {

//#2
        Post.findById(1)
        .then((post) => {
          expect(err).toBeNull();
          expect(post).toBeNull();
          done();
        })
      });

    });

  }); */

});