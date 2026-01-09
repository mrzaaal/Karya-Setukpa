/**
 * Generate initials from a name
 * @param name - Full name
 * @returns 1-2 character initials
 */
export const getInitials = (name: string | undefined | null): string => {
    if (!name) return '?';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Generate a consistent color based on a string (e.g., user ID or name)
 * @param str - String to generate color from
 * @returns HSL color string
 */
export const getAvatarColor = (str: string | undefined | null): string => {
    if (!str) return 'hsl(210, 50%, 50%)'; // Default blue
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 60%, 45%)`;
};

/**
 * Get the correct photo URL or return null for fallback to initials
 * @param photoUrl - The photo URL from the user object
 * @returns Correct URL or null
 */
export const getPhotoUrl = (photoUrl: string | undefined | null): string | null => {
    if (!photoUrl) return null;

    // If it's already a full URL (Supabase), use it directly
    if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
        return photoUrl;
    }

    // For relative paths (legacy local uploads), prepend API URL
    // But in production with Supabase, this shouldn't happen
    return null; // Treat relative paths as invalid (legacy)
};
