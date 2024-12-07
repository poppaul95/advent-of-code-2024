#!/bin/bash

# Check if the argument is provided
if [ -z "$1" ]; then
	echo "Usage: $0 <day_number>"
	exit 1
fi

# Define the source template folder and the destination folder
TEMPLATE_FOLDER="template"
DESTINATION_FOLDER="day$1"

# Copy the template folder to the new destination
cp -r "$TEMPLATE_FOLDER" "$DESTINATION_FOLDER"

# Confirm the operation
echo "Created new folder: $DESTINATION_FOLDER"