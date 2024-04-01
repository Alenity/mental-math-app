FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NEXT_PUBLIC_SUPABASE_URL=https://ddooziiefbjmyacebxyp.supabase.co

ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkb296aWllZmJqbXlhY2VieHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE5MDcwMTUsImV4cCI6MjAyNzQ4MzAxNX0.W9KkthMpjvQnrppcVUu34iI9a6Q254nerJzo6zT_Vzk

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
