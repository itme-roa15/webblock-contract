---
name: "new"
title: "New chat"
skill: "New chat"
group: "utility"
order: 7
command: "/new"
aliases: ["/clear"]
args: null
blocks: ["*"]
triggers: []
mode: "client"
maxTokens: null
summary: "Starts a new chat. Earlier chats stay in /resume; nothing is sent."
summary_km: "ចាប់ផ្តើមការជជែកថ្មី។ ការជជែកមុនៗនៅតែមានក្នុង /resume ហើយមិនផ្ញើអ្វីទៅណាទេ។"
example: "/new"
example_km: "/new"
km_reviewed: false
---

## Rules

- A client skill: the chat answers it itself and never sends it to AI Codegen. It closes the chat on screen and opens
  an empty one; the next message starts a new conversation, which carries none of the earlier messages to the model.
- Nothing on the page changes, and earlier chats are kept: /resume opens them again.
