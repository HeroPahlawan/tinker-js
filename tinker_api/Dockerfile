FROM node:20-alpine

WORKDIR /home/node

COPY . .
RUN npm install --omit=dev

RUN npm install pm2 -g

ENV NODE_ENV=production

# Set a non-root user for better security
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# USER appuser

EXPOSE 3001

# Health check to monitor service
# HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl --fail http://localhost:3001 || exit 1

CMD ["pm2-runtime", "index.mjs"]
