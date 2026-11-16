---
name: "resume"
title: "Resume a chat"
skill: "Chat history"
group: "utility"
order: 8
command: "/resume"
aliases: ["/history"]
args: null
blocks: ["*"]
triggers: []
mode: "client"
maxTokens: null
summary: "Lists this website's earlier chats, newest first, and opens the one you pick."
summary_km: "បង្ហាញការជជែកមុនៗរបស់គេហទំព័រនេះ ថ្មីបំផុតមុន ហើយបើកមួយដែលអ្នកជ្រើស។"
example: "/resume"
example_km: "/resume"
km_reviewed: false
---

## Rules

- A client skill: the chat answers it itself from this website's conversations and never sends it to AI Codegen.
- Each chat shows its first message as its title, its date and how many messages it has. Picking one shows its
  messages and continues it: the next message goes to that conversation.
