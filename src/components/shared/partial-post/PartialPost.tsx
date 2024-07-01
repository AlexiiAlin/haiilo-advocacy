import React, { ReactNode } from 'react';
import { IPost, IAuthor } from '../../../types';
import './PartialPost.scss';
import { getCurrentUserEmail } from "../../../utils/getCurrentUserEmail";

type PartialPostProps = {
  post?: IPost;
  author?: IAuthor;
  deletePost: (postId: number) => void;
  children?: ReactNode;
}

const PartialPost = ({post, author, deletePost, children }: PartialPostProps) => {
  return (
    <div className="post-container">
      <cat-card>
        {post && (
          <div className="post-content">
            {
              author && (
                <div className="author-wrapper">
                  <div className="author-content">
                    <img src={author.image} alt={author.image} className="author-image"/>
                    <h6><strong>{author.userName}</strong></h6>
                  </div>
                  {
                    post.authorEmail === getCurrentUserEmail() && (
                      <div className="actions-dropdown">
                        <cat-dropdown>
                          <cat-button
                            slot="trigger"
                            color="secondary"
                          >
                            <cat-icon icon="menu-outlined" size="s"/>
                          </cat-button>
                          <div slot="content">
                            <cat-button className="cat-nav-item" onClick={() => deletePost(post.id)} size="m">
                              Delete
                            </cat-button>
                          </div>
                        </cat-dropdown>
                      </div>
                    )
                  }
                </div>
              )
            }

            <h4>{post.title}</h4>
            <img src={post.image} alt={post.image} className="post-image"/>
            <p>{post.text}</p>

            {children}
          </div>
        )}
      </cat-card>
    </div>
  );
};

export default PartialPost;