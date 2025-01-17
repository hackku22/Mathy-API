#!/bin/bash

ENV_NODE="$(which node)"
ENV_PNPM="$(which pnpm)"

LOGO="     _
    / /\       ______      _        _ _
   / /  \     |  ____|    | |      | | |
  / / /\ \    | |__  __  _| |_ ___ | | | ___
 / / /\ \ \   |  __| \ \/ / __/ _ \| | |/ _ \\
/ / /  \ \_\  | |____ >  <| || (_) | | | (_) |
\/_/    \/_/  |______/_/\_\\\__\___/|_|_|\___/
"

# Author: Tasos Latsas

# spinner.sh
#
# Display an awesome 'spinner' while running your long shell commands
#
# Do *NOT* call _spinner function directly.
# Use {start,stop}_spinner wrapper functions

# usage:
#   1. source this script in your's
#   2. start the spinner:
#       start_spinner [display-message-here]
#   3. run your command
#   4. stop the spinner:
#       stop_spinner [your command's exit status]
#
# Also see: test.sh


function _spinner() {
    # $1 start/stop
    #
    # on start: $2 display message
    # on stop : $2 process exit status
    #           $3 spinner function pid (supplied from stop_spinner)

    local on_success="DONE"
    local on_fail="FAIL"
    local white="\e[1;37m"
    local green="\e[1;32m"
    local red="\e[1;31m"
    local nc="\e[0m"

    case $1 in
        start)
            # calculate the column where spinner and status msg will be displayed
            let column=$(tput cols)-${#2}-8
            # display message and position the cursor in $column column
            echo -ne ${2}
            printf "%${column}s"

            # start spinner
            i=1
            sp='\|/-'
            delay=${SPINNER_DELAY:-0.15}

            while :
            do
                printf "\b${sp:i++%${#sp}:1}"
                sleep $delay
            done
            ;;
        stop)
            if [[ -z ${3} ]]; then
                echo "spinner is not running.."
                exit 1
            fi

            kill $3 > /dev/null 2>&1

            # inform the user uppon success or failure
            echo -en "\b["
            if [[ $2 -eq 0 ]]; then
                echo -en "${green}${on_success}${nc}"
            else
                echo -en "${red}${on_fail}${nc}"
            fi
            echo -e "]"
            ;;
        *)
            echo "invalid argument, try {start/stop}"
            exit 1
            ;;
    esac
}

function start_spinner {
    # $1 : msg to display
    _spinner "start" "${1}" &
    # set global spinner pid
    _sp_pid=$!
    disown
}

function stop_spinner {
    # $1 : command exit status
    _spinner "stop" $1 $_sp_pid
    unset _sp_pid
}

function echoRun() {
  echo ""
  echo "+ $@"
  echo ""
  "$@"
  echo ""
}

if [ ! -d "./node_modules" ]; then
  echo "$LOGO"
  echo "+----------------------------------------+"
  echo "| Docs: https://extollo.garrettmills.dev |"
  echo "+----------------------------------------+"
  echo ""
  echo "Welcome to Extollo! Let's set things up for the first time..."

  if [ ! -x "$ENV_PNPM" ]; then
    echo "Please install PNPM to use Extollo."
  fi

  echoRun "$ENV_PNPM" i

  echoRun ./node_modules/.bin/ts-patch i

  if [ ! -f "./.env" ]; then
    echoRun cp example.env .env
  fi

  echo ""
  echo ""
  printf "\033[32m✓\033[39m Looks like you're all set up! Run this command again to access the Extollo CLI.\n"
else
  start_spinner "Building your app..."
  BUILD_OUTPUT="$($ENV_PNPM run build  2>&1)"
  BUILD_EC=$?
  stop_spinner $BUILD_EC
  if [ $BUILD_EC -ne 0 ]; then
    printf "\033[31m✘\033[39m Uh, oh! Looks like your application failed to build. (exit: $BUILD_EC)"
    echo "$BUILD_OUTPUT"
    exit $BUILD_EC
  fi
  "$ENV_NODE" --experimental-repl-await ./lib/cli.js $@
fi

