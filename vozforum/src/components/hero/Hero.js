import "./Hero.css"
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

const Hero = ({posts}) => {
    return(
        <div className="post-carousel-container">
            <Carousel>
                {
                    posts && posts.map((post) => (
                        <Paper key={post.id}>
                          <div className="post-card-container">
                            <div className="post-card">
                              <div className="post-detail">
                                <div className="post-poster">
                                  <img src={post.thumbnail[0]} alt="" />
                                </div>
                                <div className="post-title">
                                  <h4>{post.title}</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Paper>
                      ))
                    // posts.map((post)=>{
                    //     return(
                    //         <Paper>
                    //             <div className="post-card-container">
                    //                 <div className="post-card">
                    //                     <div className="post-detail">
                    //                         <div className="post-poster">
                    //                             <img src="" alt=""/>
                    //                         </div>
                    //                         <div className="post-title">
                    //                             <h4>{post.title}</h4>
                    //                         </div>

                    //                     </div>

                    //                 </div>

                    //             </div>

                    //         </Paper>
                    //     )
                    // })
                }
            </Carousel>

        </div>
    )
}
export default Hero