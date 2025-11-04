#!/bin/bash

echo "=== Testing Schedule Management Backend API ==="
echo ""

API_URL="http://localhost:3020"

echo "1. Testing GET /teams - Get all teams"
echo "----------------------------------------"
curl -s "$API_URL/teams" | head -c 500
echo ""
echo ""
echo ""

# Get first team code
TEAM_CODE=$(curl -s "$API_URL/teams" | grep -o '"team_code":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "2. Testing GET /teams/:teamCode/meetings"
echo "----------------------------------------"
echo "Using Team Code: $TEAM_CODE"
curl -s "$API_URL/teams/$TEAM_CODE/meetings"
echo ""
echo ""
echo ""

echo "3. Testing POST /meetings - Create new meeting"
echo "----------------------------------------"
curl -s -X POST "$API_URL/meetings" \
  -H "Content-Type: application/json" \
  -d "{
    \"team_code\": \"$TEAM_CODE\",
    \"start_datetime\": \"2024-12-01T10:00:00\",
    \"end_datetime\": \"2024-12-01T11:30:00\",
    \"description\": \"Test meeting from API\",
    \"room_name\": \"Test Room\"
  }"
echo ""
echo ""
echo ""

echo "4. Verifying new meeting was created"
echo "----------------------------------------"
curl -s "$API_URL/teams/$TEAM_CODE/meetings"
echo ""
echo ""
echo ""

echo "=== Tests completed ==="

