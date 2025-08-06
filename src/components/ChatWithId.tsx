import React from 'react';
import ChatMessage from './ChatMessage';

const ChatWithId = () => {
    return (
        <div className="max-w-4xl mx-auto px-4">
            <ChatMessage message="Hello there! How are you doing today?" sender="user" />
            <ChatMessage message="I am Fine !" sender="other" />
            <ChatMessage message="Hello there! How are you doing today?" sender="user" />
            <ChatMessage
                message={`✅ Best Practice: Use a Thread (Option 2)
If your message doesn't fit in one tweet, 2-3 tweets in a thread is the best approach.Why?
Threads allow full explanation.You can break your content into logical parts.
They keep readers engaged with a natural flow.

Twitter's algorithm often boosts threads with strong engagement.

How to do it well:

First tweet: Clear, catchy summary (hook).

Middle tweets: Expand ideas, share details, code, problems, thoughts.

Last tweet: Wrap up with takeaway, question, or CTA (call to action).

✅ Best Practice: Use a Thread (Option 2)
If your message doesn't fit in one tweet, 2-3 tweets in a thread is the best approach.

Why?

Threads allow full explanation.

You can break your content into logical parts.

They keep readers engaged with a natural flow.

Twitter's algorithm often boosts threads with strong engagement.

How to do it well:

First tweet: Clear, catchy summary (hook).

Middle tweets: Expand ideas, share details, code, problems, thoughts.

Last tweet: Wrap up with takeaway, question, or CTA (call to action).`}
                sender="other"
            />
        </div>
    );
};

export default ChatWithId;
