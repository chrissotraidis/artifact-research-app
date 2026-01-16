/**
 * Clarifying Questions Logic
 * 
 * Analyzes intent capture responses to determine which clarifying
 * questions to ask. Uses simple keyword matching for MVP.
 * 
 * Per spec (lines 619-637):
 * - Max 3 questions per user
 * - Only trigger on missing critical spec dimensions
 * - Priority: Entities > Actions > Views
 */

export interface ClarifyingQuestion {
    id: string;
    priority: number;
    question: string;
    placeholder: string;
    category: 'entities' | 'actions' | 'views';
}

// Question bank - prioritized by importance for spec completeness
const QUESTION_BANK: ClarifyingQuestion[] = [
    {
        id: 'entities',
        priority: 1,
        category: 'entities',
        question: "What are the main 'things' in your app? (e.g., tasks, lists, categories, projects)",
        placeholder: "For example: tasks, to-do items, lists, tags, projects...",
    },
    {
        id: 'actions',
        priority: 2,
        category: 'actions',
        question: "What would you want to do with this app? (e.g., add, complete, organize, delete)",
        placeholder: "For example: create tasks, mark complete, set due dates, organize by priority...",
    },
    {
        id: 'views',
        priority: 3,
        category: 'views',
        question: "How would you want to see your data? (e.g., a list, calendar, grouped by project)",
        placeholder: "For example: simple list, calendar view, kanban board, grouped by category...",
    },
];

// Keywords that indicate each category is covered
const ENTITY_KEYWORDS = [
    'task', 'tasks', 'todo', 'to-do', 'item', 'items',
    'list', 'lists', 'category', 'categories', 'project', 'projects',
    'tag', 'tags', 'label', 'labels', 'folder', 'folders',
    'note', 'notes', 'reminder', 'reminders', 'thing', 'things',
    'goal', 'goals', 'subtask', 'subtasks',
];

const ACTION_KEYWORDS = [
    'add', 'create', 'make', 'new',
    'complete', 'finish', 'done', 'check', 'mark',
    'delete', 'remove', 'archive', 'trash',
    'edit', 'update', 'change', 'modify',
    'organize', 'sort', 'filter', 'search', 'find',
    'drag', 'move', 'reorder', 'prioritize',
    'assign', 'share', 'collaborate',
    'schedule', 'set', 'due', 'deadline',
    'remind', 'notify', 'alert',
];

const VIEW_KEYWORDS = [
    'list', 'view', 'see', 'display', 'show',
    'calendar', 'week', 'day', 'month',
    'kanban', 'board', 'columns', 'lanes',
    'grid', 'table',
    'group', 'grouped', 'organize', 'organized',
    'dashboard', 'overview', 'summary',
    'timeline', 'gantt',
];

/**
 * Analyze text to determine if a category is covered
 */
function hasCategory(text: string, keywords: string[]): boolean {
    const lowerText = text.toLowerCase();
    // Check if at least 2 keywords are present (more robust than single match)
    const matches = keywords.filter(keyword => {
        // Use word boundary matching to avoid false positives
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        return regex.test(lowerText);
    });
    return matches.length >= 1; // At least one clear mention
}

/**
 * Analyze intent text and determine which clarifying questions to show
 * 
 * @param intentText - The user's freeform intent description
 * @param maxQuestions - Maximum number of questions to return (default 3)
 * @returns Array of clarifying questions to ask
 */
export function analyzeMissingDimensions(
    intentText: string,
    maxQuestions: number = 3
): ClarifyingQuestion[] {
    const text = intentText.trim();

    // If text is very short, ask all questions up to max
    if (text.length < 50) {
        return QUESTION_BANK.slice(0, maxQuestions);
    }

    const missingQuestions: ClarifyingQuestion[] = [];

    // Check each category in priority order
    if (!hasCategory(text, ENTITY_KEYWORDS)) {
        const q = QUESTION_BANK.find(q => q.category === 'entities');
        if (q) missingQuestions.push(q);
    }

    if (!hasCategory(text, ACTION_KEYWORDS)) {
        const q = QUESTION_BANK.find(q => q.category === 'actions');
        if (q) missingQuestions.push(q);
    }

    if (!hasCategory(text, VIEW_KEYWORDS)) {
        const q = QUESTION_BANK.find(q => q.category === 'views');
        if (q) missingQuestions.push(q);
    }

    // Return up to maxQuestions
    return missingQuestions.slice(0, maxQuestions);
}

/**
 * Check if clarifying questions should be shown at all
 * 
 * @param intentText - The user's freeform intent description
 * @returns True if there are missing dimensions worth asking about
 */
export function shouldShowClarifyingQuestions(intentText: string): boolean {
    const questions = analyzeMissingDimensions(intentText);
    return questions.length > 0;
}

export { QUESTION_BANK };
