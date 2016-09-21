#!/bin/sh

set -eu

SESSION=$USER-allihoopajs-example

if tmux list-sessions | grep -e "^$SESSION"; then
    tmux -2u attach-session -t $SESSION
else
    tmux -2u new-session -d -s $SESSION

    tmux send-keys "cd .." C-m "npm run tsc:watch" C-m
    tmux split-window -h
    tmux send-keys "npm run dev-server" C-m
    tmux select-pane -t 0
    tmux split-window -v
    tmux send-keys "cd .." C-m "npm run test:watch" C-m

    tmux -2u attach-session -t $SESSION
fi
