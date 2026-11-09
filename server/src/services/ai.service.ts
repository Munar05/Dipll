// AI service. No LLM is connected: without a key it returns a clearly-labelled DEMO reply.
// To connect a real model, implement the branch below (e.g. Anthropic Messages API).
export async function generateReply(history:{role:string;content:string}[]): Promise<{text:string;demo:boolean}> {
  const last = history[history.length-1]?.content ?? ''
  if (!process.env.ANTHROPIC_API_KEY) {
    return { demo:true, text:`[DEMO MODE: no AI model connected]\nYou asked: "${last}".\nSet ANTHROPIC_API_KEY in server/.env and implement the API call in services/ai.service.ts to get real analysis.` }
  }
  // TODO: real model call here.
  return { demo:true, text:'[DEMO MODE] API key found, but the model call is not implemented yet.' }
}
