import { Request, Response, NextFunction } from "express";
import redis from "../config/redis";
import { env } from "../config/env";

const WINDOW_SIZE = parseInt(env.RATE_LIMIT_WINDOW);
const MAX_REQUESTS = parseInt(env.RATE_LIMIT_MAX_REQUESTS);

export const rateLimiter = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const ip = req.ip;
  const key = `rate-limit:${ip}`;
  const now = Date.now();

  redis
    .get(key)
    .then((windowData) => {
      const currentWindow = windowData
        ? JSON.parse(windowData)
        : { requests: [], windowStart: now };

      const windowStart = now - WINDOW_SIZE * 1000;
      currentWindow.requests = currentWindow.requests.filter(
        (timestamp: number) => timestamp > windowStart
      );

      if (currentWindow.requests.length >= MAX_REQUESTS) {
        res.status(429).json({
          error: "Too many requests",
          message: `Rate limit exceeded. Try again in ${WINDOW_SIZE} seconds.`,
          retryAfter: WINDOW_SIZE,
        });
        return;
      }

      currentWindow.requests.push(now);
      currentWindow.windowStart = now;

      redis
        .setex(key, WINDOW_SIZE, JSON.stringify(currentWindow))
        .then(() => {
          res.setHeader("X-RateLimit-Limit", MAX_REQUESTS);
          res.setHeader(
            "X-RateLimit-Remaining",
            MAX_REQUESTS - currentWindow.requests.length
          );
          res.setHeader(
            "X-RateLimit-Reset",
            Math.ceil((now + WINDOW_SIZE * 1000) / 1000)
          );

          next();
        })
        .catch((error) => {
          console.error("Redis setex error:", error);
          next();
        });
    })
    .catch((error) => {
      console.error("Rate limiter error:", error);
      next();
    });
};
