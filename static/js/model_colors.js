const MODEL_VARIANT_COLORS = {
  'ACT - Single-Arm': '#ffd700',
  'ACT - Bimanual': '#fe6e5a',
  'Pi0.5 - Single-Arm': '#0070ff',
  'Pi0.5 - Bimanual': '#cd34b5',
  'MolmoAct2 - Single-Arm': '#00bfa5',
  'MolmoAct2 - Bimanual': '#0f766e',
};

const POLICY_VARIANT_KEYS = {
  act_single_arm: 'ACT - Single-Arm',
  act_bimanual: 'ACT - Bimanual',
  pi05_single_arm: 'Pi0.5 - Single-Arm',
  pi05_bimanual: 'Pi0.5 - Bimanual',
  molmoact2_single_arm: 'MolmoAct2 - Single-Arm',
  molmoact2_bimanual: 'MolmoAct2 - Bimanual',
};

function averageHexColors(first, second) {
  const channels = [1, 3, 5].map((index) => {
    const left = parseInt(first.slice(index, index + 2), 16);
    const right = parseInt(second.slice(index, index + 2), 16);
    return Math.round((left + right) / 2).toString(16).padStart(2, '0');
  });
  return '#' + channels.join('');
}

const MODEL_COLORS = {
  ACT: averageHexColors(MODEL_VARIANT_COLORS['ACT - Single-Arm'], MODEL_VARIANT_COLORS['ACT - Bimanual']),
  'Pi0.5': averageHexColors(MODEL_VARIANT_COLORS['Pi0.5 - Single-Arm'], MODEL_VARIANT_COLORS['Pi0.5 - Bimanual']),
  MolmoAct2: averageHexColors(MODEL_VARIANT_COLORS['MolmoAct2 - Single-Arm'], MODEL_VARIANT_COLORS['MolmoAct2 - Bimanual']),
};

function modelNameColor(name, variant) {
  if (variant) return MODEL_VARIANT_COLORS[name + ' - ' + variant] || MODEL_COLORS[name] || '';
  return MODEL_COLORS[name] || '';
}

function modelPolicyColor(policy) {
  return MODEL_VARIANT_COLORS[POLICY_VARIANT_KEYS[policy]] || '';
}

function applyModelNameColors(root) {
  (root || document).querySelectorAll('.model-name').forEach((el) => {
    const color = modelNameColor(el.dataset.model, el.dataset.variant);
    if (color) el.style.color = color;
  });
}

window.MODEL_VARIANT_COLORS = MODEL_VARIANT_COLORS;
window.MODEL_COLORS = MODEL_COLORS;
window.modelNameColor = modelNameColor;
window.modelPolicyColor = modelPolicyColor;
window.applyModelNameColors = applyModelNameColors;
