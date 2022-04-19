require("dotenv").config()
const reviewService = require("../services/review.service")
const review2 = require("../models/review")
const rabbitClient = require("../config/reviewdb")

const url = process.env.RABBIT_MQ_URL


/* app.post("/product/buy", isAuthenticated, async (req, res) => {
    const { ids } = req.body;
    const products = await Product.find({ _id: { $in: ids } });
   
    channel.consume("PRODUCT", (data) => {
        order = JSON.parse(data.content);
    });
    return res.json(order);
});  */
/* function bail(err) {
    console.error(err);
    process.exit(1);
  }

function publish_review(conn, data) {
    conn.createChannel(on_open);
    function on_open(err, ch) {
      if (err != null) bail(err);
      ch.assertQueue(q);
      ch.sendToQueue(q, Buffer.from(JSON.stringify(data)));
    }
  }
 */
module.exports = {
    getAllReviews :async (req, res) => {
        const review = await reviewService.getAllReviews()
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(review)
    },
    getReview :async (req, res) => {
        const review = await reviewService.getReview(req.params.review_Id)
        if(review.statusCode == 200 && (res.statusCode >= 200 && res.statusCode < 400)){
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(review)
        }
        else
        {
            res.statusCode = 400
            res.setHeader('Content-Type','application/json')
            res.json(review)
        } 
    },
    postReview : async (req, res) => {
        try{
        const review = await reviewService.postReview(req.body)
            if(review.statusCode != 400){         

            const avgRating = await reviewService.checkAvgRating(req.body.restaurant_Id)
            var et = avgRating[0].AverageValue.toFixed(1);

            rabbitClient.client.connect(url, function(err, conn) {
              if (err != null) bail(err);
              console.log("Connected, Publishing Review")
              const data = {
                  restaurant_id: req.body.restaurant_Id,
                  avg_rating: et
              }
              rabbitClient.publish_review(conn, data);
            });
            console.log(et);

            res.status(201).json(review);  
           }
           else
           {
            res.status(400).json(review);
           }
           }
        catch (e) {
               if(!e.status) {
                 res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: e.message } });
               } else {
                 res.status(e.status).json( { error: { code: e.code, message: e.message } });
               }
        }    
    },
    deleteReview : async (req, res) => {
        const check = await reviewService.deleteReview(req.params.review_Id)
        if(check.acknowledged){
            res.statusCode = 200
            res.setHeader('Content-Type','application/json')
            res.json(check)
        }
        else
        {
        res.statusCode = 400
        res.setHeader('Content-Type','application/json')
        res.json(check)
        }
    },
    updateReview : async (req, res) => {
        try {
            const review = await reviewService.updateReview(req.params.id,req.body)
            if(review.statusCode != 400){
                res.status(201).json(review);
               }
               else
               {
                res.status(400).json(review);
               }
               }
               catch (e) {
                   if(!e.status) {
                     res.status(500).json( { error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } });
                   } else {
                     res.status(e.status).json( { error: { code: e.code, message: e.message } });
                   }
            }    
    }
}