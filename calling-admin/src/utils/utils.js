// Utility function to format large numbers to 'k' format with 0.1 precision
export function formatNumber(value) {
  if (value >= 1000) {
    const formattedValue = (value / 1000).toFixed(1).replace(/\.0$/, "");
    return formattedValue + "k";
  }
  return value;
}

// transform publisher items
export const transformPublishers = (publishers, type) => {
  if (type === "instagram")
    return publishers.map((p) => ({
      image: p.publisher.image,
      post_url: p.post_url,
      screen_shot: p.screen_shot,
      account_id: p.publisher.account_id,
      member_count: formatNumber(p.publisher.member_count),
      post_like: formatNumber(p.post_like),
      post_comment: formatNumber(p.post_comment),
      post_reach: formatNumber(p.post_reach),
      post_impression: formatNumber(p.post_impression),
      story_view: formatNumber(p.story_view),
      story_link_click: formatNumber(p.story_link_click),
      story_sticker: formatNumber(p.story_sticker),
      story_impression: formatNumber(p.story_impression),
    }));
  else {
    return publishers.map((p) => ({
      image: p.publisher.image,
      post_url: p.post_url,
      screen_shot: p.screen_shot,
      account_id: p.publisher.account_id,
      member_count: formatNumber(p.publisher.member_count),
      post_view: formatNumber(p.post_view),
      click_count: formatNumber(p.click_count),
    }));
  }
};
