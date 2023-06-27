//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Welcome to The Daily Journal !Capture and share your life's moments through vlogs on our platform. The Daily Journal is a vibrant community where you can express yourself, connect with like-minded individuals, and showcase your unique experiences. Whether you're a seasoned vlogger or just starting out, our platform provides the perfect space for you to share your stories with the world.Join our growing community and embark on a journey of self - expression.Explore the diverse range of vlogs covering travel, food, fashion, lifestyle, and so much more.Immerse yourself in captivating visuals, authentic narratives, and genuine emotions that make each vlog a true reflection of the creator's personality.Are you ready to share your adventures, insights, and creative ideas ? Sign up today and let your voice be heard.Unleash your creativity, build connections, and inspire others through the power of vlogging.The Daily Journal is here to support you every step of the way.";
const aboutContent = "About The Daily JournalAt The Daily Journal, we believe that everyone has a story worth sharing.Our mission is to provide a platform that empowers individuals to express themselves through vlogging, fostering a sense of community and inspiration..Our team is dedicated to creating an inclusive and supportive environment where creators of all backgrounds can find their voice and connect with a global audience.Through The Daily Journal, we aim to celebrate diversity, creativity, and personal growth.We encourage our users to share their passions, perspectives, and unique experiences, cultivating a rich tapestry of vlogs that inspire, entertain, and educate.Join us on this exciting journey as we embrace the art of vlogging and encourage the world to see life through your lens.Together, we can create a community that celebrates individuality and empowers every voice to be heard.";
const contactContent = "Get in Touch with The Daily JournalWe value your feedback, questions, and suggestions.If you have any inquiries or need assistance, feel free to reach out to us.Our dedicated team is here to help and ensure your experience with The Daily Journal is exceptional.We look forward to hearing from you and building a strong relationship with our valued users.Your feedback is invaluable in shaping the future of The Daily Journal, so don't hesitate to get in touch!";

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts=[];


app.get("/",function(req,res){
  res.render("home",{startingContent:homeStartingContent,posts:posts});
 
});

app.get("/about", function (req, res) {
 
  res.render("about", {aboutContent:aboutContent });

});


app.get("/contact", function (req, res) {
  
  res.render("contact", {contactContent:contactContent });
 
});



app.get("/compose", function (req, res) {

  res.render("compose");

});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.posttitle,
    content: req.body.postBody
  }
  posts.push(post);
res.redirect("/");
});



app.get("/posts/:postName",function(req,res){
  const requested=_.lowerCase(req.params.postName);

  posts.forEach(function(post){
  const stored =_.lowerCase(post.title);

  if(stored==requested){
    res.render("post",{
      title:post.title,
      content:post.content
    })
  }
  })
})


app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
