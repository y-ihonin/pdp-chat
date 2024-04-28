FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /client

COPY package.json package-lock.json ./
RUN npm install --production

FROM node:18-alpine AS builder
WORKDIR /client
COPY --from=deps /client/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /client

ENV NODE_ENV production

COPY --from=builder /client/node_modules ./node_modules
COPY --from=builder /client/package.json ./package.json

# USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]

#-------------------
# FROM node:18-alpine AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /client

# COPY public/ ./
# COPY src/ ./
# COPY package.json package-lock.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# # EXPOSE 3000

# # ENV PORT 3000

# CMD ["npm", "start"]

#-------------------
