import wave
import struct
import math
import random
import os

def generate_track(filename="assets/audio/shashwat-cinematic-theme.wav"):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    sample_rate = 44100
    bpm = 104
    beat_sec = 60.0 / bpm
    bar_sec = beat_sec * 4.0
    num_bars = 16
    total_duration = num_bars * bar_sec
    total_samples = int(total_duration * sample_rate)
    
    # 4-chord uplifting corporate progression (D - G - Bm - A)
    progression = [
        # (chord_frequencies, bass_freq)
        ([146.83, 220.00, 293.66, 369.99, 440.00, 587.33], 73.42),   # D major
        ([196.00, 246.94, 293.66, 392.00, 493.88, 587.33], 49.00),   # G major
        ([123.47, 185.00, 246.94, 293.66, 369.99, 493.88], 61.74),   # B minor
        ([110.00, 164.81, 220.00, 277.18, 329.63, 440.00], 55.00),   # A major
    ]
    
    left = [0.0] * total_samples
    right = [0.0] * total_samples
    
    # 1. Warm Analog Chord Pads
    for bar_idx in range(num_bars):
        chord_idx = bar_idx % 4
        notes, _ = progression[chord_idx]
        bar_start_sample = int(bar_idx * bar_sec * sample_rate)
        bar_len_samples = int(bar_sec * sample_rate)
        
        for i in range(bar_len_samples):
            idx = bar_start_sample + i
            if idx >= total_samples: break
            t = i / sample_rate
            # Smooth envelope
            env = 1.0
            attack = 0.4
            release = 0.5
            if t < attack:
                env = t / attack
            elif t > (bar_sec - release):
                env = (bar_sec - t) / release
                
            sig_l = 0.0
            sig_r = 0.0
            for note_f in notes[:4]:
                sig_l += math.sin(2.0 * math.pi * note_f * t) * 0.035
                sig_r += math.sin(2.0 * math.pi * (note_f * 1.003) * t) * 0.035
            left[idx] += sig_l * env
            right[idx] += sig_r * env

    # 2. Grand Piano Arpeggios (Crisp & Inspiring)
    arp_pattern = [0, 2, 4, 3, 5, 4, 2, 3]
    for bar_idx in range(num_bars):
        chord_idx = bar_idx % 4
        notes, _ = progression[chord_idx]
        bar_start_t = bar_idx * bar_sec
        step_dur = bar_sec / 8.0
        
        for step in range(8):
            note_f = notes[arp_pattern[step] % len(notes)] * 2.0  # Octave up
            t_note = bar_start_t + step * step_dur
            start_s = int(t_note * sample_rate)
            dur_samples = int(0.7 * sample_rate)
            
            pan = 0.4 + 0.2 * math.sin(step * 1.2)
            for i in range(dur_samples):
                idx = start_s + i
                if idx >= total_samples: break
                t = i / sample_rate
                env = math.exp(-t * 5.0) * (1.0 - math.exp(-t * 180.0))
                # Harmonics for rich piano tone
                sample = (
                    math.sin(2.0 * math.pi * note_f * t) +
                    0.45 * math.sin(2.0 * math.pi * note_f * 2.0 * t) * math.exp(-t * 6.0) +
                    0.20 * math.sin(2.0 * math.pi * note_f * 3.0 * t) * math.exp(-t * 9.0)
                ) * env * 0.075
                left[idx] += sample * (1.0 - pan)
                right[idx] += sample * pan

    # 3. Warm Bass Groove
    for bar_idx in range(num_bars):
        chord_idx = bar_idx % 4
        _, bass_f = progression[chord_idx]
        bar_start_t = bar_idx * bar_sec
        
        for beat_off in [0.0, 2.0 * beat_sec]:
            t_hit = bar_start_t + beat_off
            start_s = int(t_hit * sample_rate)
            dur_samples = int(beat_sec * 1.8 * sample_rate)
            
            for i in range(dur_samples):
                idx = start_s + i
                if idx >= total_samples: break
                t = i / sample_rate
                env = math.exp(-t * 2.5) * (1.0 - math.exp(-t * 80.0))
                bass_sample = (
                    math.sin(2.0 * math.pi * bass_f * t) +
                    0.3 * math.sin(2.0 * math.pi * bass_f * 2.0 * t)
                ) * env * 0.12
                left[idx] += bass_sample
                right[idx] += bass_sample

    # 4. Subtle Acoustic Shakers & Kick
    # Shaker on 16th notes
    shaker_step = beat_sec / 4.0
    num_shaker_steps = int(total_duration / shaker_step)
    rnd = random.Random(42)
    for s in range(num_shaker_steps):
        t_hit = s * shaker_step
        start_s = int(t_hit * sample_rate)
        dur_samples = int(0.04 * sample_rate)
        accent = 1.3 if (s % 4 == 2) else 0.7
        for i in range(dur_samples):
            idx = start_s + i
            if idx >= total_samples: break
            t = i / sample_rate
            env = math.exp(-t * 90.0)
            noise = (rnd.random() * 2.0 - 1.0) * env * 0.016 * accent
            left[idx] += noise
            right[idx] += noise * 1.1

    # Soft Acoustic Kick on 1 & 3
    num_beats = int(total_duration / beat_sec)
    for b in range(num_beats):
        if b % 2 == 0:
            t_hit = b * beat_sec
            start_s = int(t_hit * sample_rate)
            dur_samples = int(0.18 * sample_rate)
            for i in range(dur_samples):
                idx = start_s + i
                if idx >= total_samples: break
                t = i / sample_rate
                f_pitch = 110.0 * math.exp(-t * 30.0) + 48.0
                kick = math.sin(2.0 * math.pi * f_pitch * t) * math.exp(-t * 16.0) * 0.13
                left[idx] += kick
                right[idx] += kick

    # Master Normalization
    peak = 0.0001
    for i in range(total_samples):
        if abs(left[i]) > peak: peak = abs(left[i])
        if abs(right[i]) > peak: peak = abs(right[i])
        
    scale = 0.88 / peak
    # Smooth loop crossfade on boundaries
    fade_samples = int(sample_rate * 0.6)
    for i in range(fade_samples):
        f_in = i / fade_samples
        left[i] *= f_in
        right[i] *= f_in
        f_out = (fade_samples - i) / fade_samples
        left[total_samples - fade_samples + i] *= f_out
        right[total_samples - fade_samples + i] *= f_out
        
    with wave.open(filename, 'wb') as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        
        frames = bytearray()
        for i in range(total_samples):
            l_val = int(max(-1.0, min(1.0, left[i] * scale)) * 32767)
            r_val = int(max(-1.0, min(1.0, right[i] * scale)) * 32767)
            frames.extend(struct.pack('<hh', l_val, r_val))
            
        wf.writeframes(frames)
    print(f"Generated {filename} successfully ({total_duration:.1f}s)")

if __name__ == "__main__":
    generate_track()
