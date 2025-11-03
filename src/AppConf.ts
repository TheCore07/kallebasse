import type ChangelogEntry from "./types/AppConf.ts";

export const AppConf = {
    AppVersion: "v2025.11.1",
    Changelog: [
        {
            version: "2025.11.1",
            date: "2025-11-03",
            changes: [
                "Added Changelog",
                "Added Authorization"
            ]
        }
    ] as ChangelogEntry[],
}