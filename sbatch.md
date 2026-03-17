---
layout: page
title: Sbatch Builder
permalink: /sbatch/
---

<div class="page-intro">
  <p>Build Slurm `sbatch` scripts directly in the browser. The form below runs with plain JavaScript, so users can generate, copy, and download batch files without any backend or interpreter startup.</p>
  <p class="tool-meta">This is a script generator only. It does not connect to a cluster or submit jobs.</p>
</div>

<section class="tool-shell">
  <article class="tool-card">
    <div class="tool-card-body">
      <h2>Job Configuration</h2>
      <div class="tool-grid">
        <label class="tool-field">
          <span class="tool-label">Job Name</span>
          <input class="tool-input" id="job-name" type="text" value="seasonal-forecast-run">
        </label>
        <label class="tool-field">
          <span class="tool-label">Partition</span>
          <input class="tool-input" id="partition" type="text" value="compute">
        </label>

        <label class="tool-field">
          <span class="tool-label">Wall Time</span>
          <input class="tool-input" id="time-limit" type="text" value="08:00:00">
        </label>
        <label class="tool-field">
          <span class="tool-label">Memory</span>
          <input class="tool-input" id="memory" type="text" value="16G">
        </label>

        <label class="tool-field">
          <span class="tool-label">Nodes</span>
          <input class="tool-input" id="nodes" type="number" min="1" value="1">
        </label>
        <label class="tool-field">
          <span class="tool-label">Tasks</span>
          <input class="tool-input" id="ntasks" type="number" min="1" value="1">
        </label>

        <label class="tool-field">
          <span class="tool-label">CPUs Per Task</span>
          <input class="tool-input" id="cpus-per-task" type="number" min="1" value="4">
        </label>
        <label class="tool-field">
          <span class="tool-label">GPUs</span>
          <input class="tool-input" id="gpus" type="text" placeholder="Optional">
        </label>

        <label class="tool-field">
          <span class="tool-label">Account</span>
          <input class="tool-input" id="account" type="text" placeholder="project_account">
        </label>
        <label class="tool-field">
          <span class="tool-label">QoS</span>
          <input class="tool-input" id="qos" type="text" placeholder="normal">
        </label>

        <label class="tool-field tool-field-full">
          <span class="tool-label">Working Directory</span>
          <input class="tool-input" id="workdir" type="text" value="$HOME/projects/climate-agriculture">
          <span class="tool-help">The generated script changes into this directory before loading modules and starting the job.</span>
        </label>

        <p class="tool-divider">Output And Notifications</p>

        <label class="tool-field">
          <span class="tool-label">Output File</span>
          <input class="tool-input" id="stdout-file" type="text" value="logs/%x-%j.out">
        </label>
        <label class="tool-field">
          <span class="tool-label">Error File</span>
          <input class="tool-input" id="stderr-file" type="text" value="logs/%x-%j.err">
        </label>

        <label class="tool-field">
          <span class="tool-label">Mail Type</span>
          <select class="tool-select" id="mail-type">
            <option value="">No email</option>
            <option value="END,FAIL" selected>END,FAIL</option>
            <option value="FAIL">FAIL</option>
            <option value="ALL">ALL</option>
            <option value="BEGIN,END,FAIL">BEGIN,END,FAIL</option>
          </select>
        </label>
        <label class="tool-field">
          <span class="tool-label">Mail User</span>
          <input class="tool-input" id="mail-user" type="email" placeholder="you@example.org">
        </label>

        <p class="tool-divider">Environment And Commands</p>

        <label class="tool-field tool-field-full">
          <span class="tool-label">Modules</span>
          <input class="tool-input" id="modules" type="text" value="python/3.11 gcc/12.2">
          <span class="tool-help">Separate module names with spaces.</span>
        </label>

        <label class="tool-field">
          <span class="tool-label">Conda Environment</span>
          <input class="tool-input" id="conda-env" type="text" placeholder="forecast-env">
        </label>
        <label class="tool-field">
          <span class="tool-label">Main Command</span>
          <input class="tool-input" id="launch-command" type="text" value="srun python run_model.py">
        </label>

        <label class="tool-field tool-field-full">
          <span class="tool-label">Commands Before Launch</span>
          <textarea class="tool-textarea" id="pre-commands">mkdir -p logs
echo "Running on $(hostname)"
python --version</textarea>
        </label>

        <label class="tool-field tool-field-full">
          <span class="tool-label">Commands After Launch</span>
          <textarea class="tool-textarea" id="post-commands" placeholder="Optional cleanup or post-processing"></textarea>
        </label>
      </div>

      <div class="tool-actions">
        <button class="btn btn-primary" id="generate-sbatch" type="button">Generate Script</button>
        <button class="btn btn-outline" id="load-gpu-example" type="button">Load GPU Example</button>
      </div>
      <p class="tool-status" id="tool-status">Ready.</p>
    </div>
  </article>

  <aside class="tool-card">
    <div class="tool-card-body">
      <div class="tool-output-head">
        <h2>Generated Script</h2>
        <span class="tool-badge">Instant</span>
      </div>
      <pre class="tool-output"><code id="sbatch-output">Generating initial script...</code></pre>

      <div class="tool-output-actions">
        <button class="btn btn-primary" id="copy-script" type="button">Copy</button>
        <button class="btn btn-outline" id="download-script" type="button">Download</button>
      </div>

      <div class="tool-notes">
        <p class="tool-note">Adjust partition names, account values, module names, and GPU flags to match your HPC cluster.</p>
        <p class="tool-note">If your scheduler setup expects a launcher other than `srun`, replace the main command before downloading.</p>
        <p class="tool-note">All generation happens client-side in the browser.</p>
      </div>
    </div>
  </aside>
</section>

<script>
(function () {
  var fields = {
    jobName: document.getElementById("job-name"),
    partition: document.getElementById("partition"),
    timeLimit: document.getElementById("time-limit"),
    memory: document.getElementById("memory"),
    nodes: document.getElementById("nodes"),
    ntasks: document.getElementById("ntasks"),
    cpusPerTask: document.getElementById("cpus-per-task"),
    gpus: document.getElementById("gpus"),
    account: document.getElementById("account"),
    qos: document.getElementById("qos"),
    workdir: document.getElementById("workdir"),
    stdoutFile: document.getElementById("stdout-file"),
    stderrFile: document.getElementById("stderr-file"),
    mailType: document.getElementById("mail-type"),
    mailUser: document.getElementById("mail-user"),
    modules: document.getElementById("modules"),
    condaEnv: document.getElementById("conda-env"),
    launchCommand: document.getElementById("launch-command"),
    preCommands: document.getElementById("pre-commands"),
    postCommands: document.getElementById("post-commands")
  };

  var output = document.getElementById("sbatch-output");
  var status = document.getElementById("tool-status");
  var generateButton = document.getElementById("generate-sbatch");
  var exampleButton = document.getElementById("load-gpu-example");
  var copyButton = document.getElementById("copy-script");
  var downloadButton = document.getElementById("download-script");

  function valueOf(key) {
    return fields[key].value.trim();
  }

  function setField(key, value) {
    fields[key].value = value;
  }

  function setStatus(message) {
    status.textContent = message;
  }

  function maybeAdd(lines, flag, value) {
    if (value) {
      lines.push("#SBATCH " + flag + "=" + value);
    }
  }

  function buildScript() {
    var jobName = valueOf("jobName") || "job";
    var lines = [
      "#!/bin/bash",
      "#SBATCH --job-name=" + jobName
    ];

    maybeAdd(lines, "--partition", valueOf("partition"));
    maybeAdd(lines, "--time", valueOf("timeLimit"));
    maybeAdd(lines, "--mem", valueOf("memory"));
    maybeAdd(lines, "--nodes", valueOf("nodes") || "1");
    maybeAdd(lines, "--ntasks", valueOf("ntasks") || "1");
    maybeAdd(lines, "--cpus-per-task", valueOf("cpusPerTask") || "1");
    maybeAdd(lines, "--gpus", valueOf("gpus"));
    maybeAdd(lines, "--account", valueOf("account"));
    maybeAdd(lines, "--qos", valueOf("qos"));
    maybeAdd(lines, "--output", valueOf("stdoutFile"));
    maybeAdd(lines, "--error", valueOf("stderrFile"));
    maybeAdd(lines, "--mail-type", valueOf("mailType"));
    maybeAdd(lines, "--mail-user", valueOf("mailUser"));

    var body = [
      "",
      "set -euo pipefail",
      "",
      'echo "Job ${SLURM_JOB_ID} started on $(date)"'
    ];

    if (valueOf("workdir")) {
      body.push("", 'cd "' + valueOf("workdir") + '"');
    }

    if (valueOf("modules")) {
      body.push("", "module purge", "module load " + valueOf("modules"));
    }

    if (valueOf("condaEnv")) {
      body.push("", 'source "$(conda info --base)/etc/profile.d/conda.sh"', "conda activate " + valueOf("condaEnv"));
    }

    if (valueOf("preCommands")) {
      body.push("", "# Setup", valueOf("preCommands"));
    }

    body.push("", "# Main workload", valueOf("launchCommand") || "srun hostname");

    if (valueOf("postCommands")) {
      body.push("", "# Post-processing", valueOf("postCommands"));
    }

    body.push("", 'echo "Job ${SLURM_JOB_ID} finished on $(date)"');

    return {
      text: lines.concat(body).join("\n"),
      jobName: jobName
    };
  }

  function renderScript() {
    var script = buildScript();
    output.textContent = script.text;
    return script;
  }

  function generateSbatch() {
    renderScript();
    setStatus("Script regenerated.");
  }

  function loadGpuExample() {
    setField("jobName", "crop-yield-gpu");
    setField("partition", "gpu");
    setField("timeLimit", "12:00:00");
    setField("memory", "64G");
    setField("nodes", "1");
    setField("ntasks", "1");
    setField("cpusPerTask", "8");
    setField("gpus", "1");
    setField("account", "climate_lab");
    setField("qos", "accelerated");
    setField("workdir", "$HOME/projects/seasonal-forecast");
    setField("stdoutFile", "logs/%x-%j.out");
    setField("stderrFile", "logs/%x-%j.err");
    setField("mailType", "BEGIN,END,FAIL");
    setField("mailUser", "you@example.org");
    setField("modules", "cuda/12.2 python/3.11");
    setField("condaEnv", "torch-env");
    setField("launchCommand", "srun python train_forecast_model.py --config configs/gpu.yaml");
    setField("preCommands", 'mkdir -p logs\nnvidia-smi\npython -c "import torch; print(torch.cuda.is_available())"');
    setField("postCommands", "python summarize_results.py");
    renderScript();
    setStatus("GPU example loaded.");
  }

  function copyScript() {
    var script = renderScript();
    navigator.clipboard.writeText(script.text).then(function () {
      setStatus("Script copied to clipboard.");
    });
  }

  function downloadScript() {
    var script = buildScript();
    var blob = new Blob([script.text], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = script.jobName + ".sbatch";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setStatus('Downloaded "' + script.jobName + '.sbatch".');
  }

  generateButton.addEventListener("click", generateSbatch);
  exampleButton.addEventListener("click", loadGpuExample);
  copyButton.addEventListener("click", copyScript);
  downloadButton.addEventListener("click", downloadScript);
  renderScript();
})();
</script>
