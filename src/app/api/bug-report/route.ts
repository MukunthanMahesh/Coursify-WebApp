import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const GITHUB_REPO = "amaanjaved1/Coursify-WebApp";
const GITHUB_API_BASE = "https://api.github.com";

export async function POST(request: NextRequest) {
  // Auth
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.match(/^Bearer\s+(\S+)$/i)?.[1];
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
  );
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse body
  let body: { title?: string; description?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const title = body.title?.trim() ?? "";
  const description = body.description?.trim() ?? "";

  if (!title || title.length > 200) {
    return NextResponse.json(
      { error: "Title must be between 1 and 200 characters" },
      { status: 400 },
    );
  }
  if (!description || description.length > 5000) {
    return NextResponse.json(
      { error: "Description must be between 1 and 5000 characters" },
      { status: 400 },
    );
  }

  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    return NextResponse.json(
      { error: "Bug reporting is not configured" },
      { status: 503 },
    );
  }

  const issueBody = `## Description\n\n${description}\n\n---\n*Reported by: ${user.email}*\n*Submitted at: ${new Date().toISOString()}*`;

  const ghRes = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_REPO}/issues`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${githubToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body: issueBody,
      labels: ["bug"],
    }),
  });

  if (!ghRes.ok) {
    const text = await ghRes.text();
    console.error("GitHub API error:", ghRes.status, text);
    return NextResponse.json(
      { error: "Failed to create issue" },
      { status: 502 },
    );
  }

  const issue = (await ghRes.json()) as { html_url: string; number: number };
  return NextResponse.json({
    issueUrl: issue.html_url,
    issueNumber: issue.number,
  });
}
